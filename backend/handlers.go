package main

import (
	"database/sql"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// SubmitQuoteRequest is the request body for quote submission
type SubmitQuoteRequest struct {
	FullName              string    `json:"full_name" binding:"required"`
	Phone                 string    `json:"phone" binding:"required"`
	Email                 string    `json:"email" binding:"required,email"`
	City                  string    `json:"city" binding:"required"`
	ProjectType           string    `json:"project_type" binding:"required"`
	ProjectDescription    string    `json:"project_description"`
	BudgetRange           string    `json:"budget_range"`
	DesiredCompletionDate string    `json:"desired_completion_date"`
}

// QuoteResponse is the response after submitting a quote
type QuoteResponse struct {
	ID           int       `json:"id"`
	FullName     string    `json:"full_name"`
	Phone        string    `json:"phone"`
	Email        string    `json:"email"`
	City         string    `json:"city"`
	ProjectType  string    `json:"project_type"`
	Status       string    `json:"status"`
	CreatedAt    time.Time `json:"created_at"`
}

// getServices returns all services
func getServices(c *gin.Context) {
	rows, err := DB.Query("SELECT id, name, description, sort_order FROM services ORDER BY sort_order")
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to fetch services"})
		return
	}
	defer rows.Close()

	var services []gin.H
	for rows.Next() {
		var id int
		var name, description string
		var sortOrder int
		if err := rows.Scan(&id, &name, &description, &sortOrder); err != nil {
			continue
		}
		services = append(services, gin.H{
			"id":          id,
			"name":        name,
			"description": description,
			"sort_order":  sortOrder,
		})
	}
	c.JSON(200, services)
}

// getGallery returns gallery items filtered by category
func getGallery(c *gin.Context) {
	category := c.Query("category")
	var rows *sql.Rows
	if category != "" {
		rows, _ = DB.Query("SELECT id, title, description, category, image_url, created_at FROM gallery WHERE category = $1 ORDER BY created_at DESC", category)
	} else {
		rows, _ = DB.Query("SELECT id, title, description, category, image_url, created_at FROM gallery ORDER BY created_at DESC")
	}
	defer rows.Close()

	var items []gin.H
	for rows.Next() {
		var id int
		var title, description, category, imageURL string
		var createdAt time.Time
		if err := rows.Scan(&id, &title, &description, &category, &imageURL, &createdAt); err != nil {
			continue
		}
		items = append(items, gin.H{
			"id": id, "title": title, "description": description,
			"category": category, "image_url": imageURL, "created_at": createdAt,
		})
	}
	c.JSON(200, items)
}

// submitQuote handles quote submission
func submitQuote(c *gin.Context) {
	var req SubmitQuoteRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request body: " + err.Error()})
		return
	}

	// Parse completion date if provided
	var completionDate *time.Time
	if req.DesiredCompletionDate != "" {
		t, err := time.Parse("2006-01-02", req.DesiredCompletionDate)
		if err == nil {
			completionDate = &t
		}
	}

	result, err := DB.Exec(
		`INSERT INTO quotes (full_name, phone, email, city, project_type, project_description, budget_range, desired_completion_date, status)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'new')`,
		req.FullName, req.Phone, req.Email, req.City,
		req.ProjectType, req.ProjectDescription, req.BudgetRange, completionDate,
	)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to submit quote: " + err.Error()})
		return
	}

	id, _ := result.LastInsertId()
	c.JSON(http.StatusCreated, QuoteResponse{
		ID:        int(id),
		FullName:  req.FullName,
		Phone:     req.Phone,
		Email:     req.Email,
		City:      req.City,
		ProjectType: req.ProjectType,
		Status:    "new",
	})
}

// getQuotes returns all quotes with optional status filter
func getQuotes(c *gin.Context) {
	status := c.Query("status")
	var rows *sql.Rows
	if status != "" {
		rows, _ = DB.Query("SELECT id, full_name, phone, email, city, project_type, project_description, budget_range, desired_completion_date, status, created_at FROM quotes WHERE status = $1 ORDER BY created_at DESC", status)
	} else {
		rows, _ = DB.Query("SELECT id, full_name, phone, email, city, project_type, project_description, budget_range, desired_completion_date, status, created_at FROM quotes ORDER BY created_at DESC")
	}
	defer rows.Close()

	var quotes []gin.H
	for rows.Next() {
		var id int
		var fullName, phone, email, city, projectType, description, budgetRange, status, createdAt string
		var completedDate *time.Time
		if err := rows.Scan(&id, &fullName, &phone, &email, &city, &projectType, &description, &budgetRange, &completedDate, &status, &createdAt); err != nil {
			continue
		}
		q := gin.H{
			"id": id, "full_name": fullName, "phone": phone, "email": email,
			"city": city, "project_type": projectType, "project_description": description,
			"budget_range": budgetRange, "status": status, "created_at": createdAt,
		}
		if completedDate != nil {
			q["desired_completion_date"] = completedDate.Format("2006-01-02")
		}
		quotes = append(quotes, q)
	}
	c.JSON(200, quotes)
}

// updateQuoteStatus updates the status of a quote
func updateQuoteStatus(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(400, gin.H{"error": "Invalid quote ID"})
		return
	}

	var req struct {
		Status string `json:"status" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Invalid request: " + err.Error()})
		return
	}

	_, err = DB.Exec("UPDATE quotes SET status = $1 WHERE id = $2", req.Status, id)
	if err != nil {
		c.JSON(500, gin.H{"error": "Failed to update quote: " + err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "Quote status updated", "id": id, "status": req.Status})
}

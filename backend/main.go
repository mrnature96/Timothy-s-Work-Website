package main

import (
	"context"
	"database/sql"
	"log"
	"os"

	_ "github.com/lib/pq"
	"github.com/gin-gonic/gin"
)

// DB is the global database connection
var DB *sql.DB

func main() {
	// Database URL from env or default
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		dbURL = "postgres://postgres:postgres@localhost:5432/timswelding?sslmode=disable"
	}

	// Connect to database
	var err error
	DB, err = sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatalf("Failed to ping database: %v", err)
	}
	log.Println("Connected to PostgreSQL")

	// Run migrations
	if err = migrate(); err != nil {
		log.Fatalf("Migration failed: %v", err)
	}

	// Setup routes
	r := gin.Default()

	// CORS middleware for React frontend
	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	// Serve static React files in production
	if _, err := os.Stat("./frontend/dist"); err == nil {
		// Serve static assets
		r.Static("/static", "./frontend/dist/static")
		// Serve index.html for all non-API routes (SPA client-side routing)
		r.NoRoute(func(c *gin.Context) {
			c.File("./frontend/dist/index.html")
		})
	}

	// API routes
	api := r.Group("/api/v1")
	{
		api.GET("/health", healthCheck)
		api.GET("/services", getServices)
		api.GET("/gallery", getGallery)
		api.POST("/quote", submitQuote)
		api.GET("/quotes", getQuotes)
		api.PUT("/quotes/:id", updateQuoteStatus)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on :%s", port)
	if err = r.Run(":" + port); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}

// HealthCheckResponse is the health check response
type HealthCheckResponse struct {
	Status  string `json:"status"`
	Service string `json:"service"`
}

func healthCheck(c *gin.Context) {
	if err := DB.Ping(); err != nil {
		c.JSON(503, HealthCheckResponse{Status: "unhealthy", Service: "tims-welding"})
		return
	}
	c.JSON(200, HealthCheckResponse{Status: "healthy", Service: "tims-welding"})
}

// migrate runs database migrations
func migrate() error {
	ctx := context.Background()

	// Create tables if they don't exist
	statements := []string{
		`CREATE TABLE IF NOT EXISTS quotes (
			id SERIAL PRIMARY KEY,
			full_name VARCHAR(255) NOT NULL,
			phone VARCHAR(50) NOT NULL,
			email VARCHAR(255) NOT NULL,
			city VARCHAR(100) NOT NULL,
			project_type VARCHAR(100) NOT NULL,
			project_description TEXT,
			budget_range VARCHAR(100),
			desired_completion_date DATE,
			status VARCHAR(50) DEFAULT 'new',
			created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
		)`,
		`CREATE TABLE IF NOT EXISTS gallery (
			id SERIAL PRIMARY KEY,
			title VARCHAR(255) NOT NULL,
			description TEXT,
			category VARCHAR(100) NOT NULL,
			image_url VARCHAR(500) NOT NULL,
			created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
		)`,
		`CREATE TABLE IF NOT EXISTS services (
			id SERIAL PRIMARY KEY,
			name VARCHAR(255) NOT NULL,
			description TEXT,
			sort_order INTEGER DEFAULT 0
		)`,
	}

	for _, stmt := range statements {
		if _, err := DB.ExecContext(ctx, stmt); err != nil {
			return err
		}
	}

	// Seed default services if empty
	count := 0
	DB.QueryRowContext(ctx, "SELECT COUNT(*) FROM services").Scan(&count)
	if count == 0 {
		services := []struct {
			name, description string
			order             int
		}{
			{"Custom Metal Fabrication", "Precision metal fabrication for custom projects of any size.", 1},
			{"Structural Steel", "Structural steel fabrication and installation for commercial and industrial projects.", 2},
			{"Welding Repair", "Emergency and scheduled welding repairs for equipment, structures, and more.", 3},
			{"Ranch & Farm Welding", "Welding services tailored for agricultural and rural properties.", 4},
			{"Gates & Entrances", "Custom gates, entrance gates, and security fencing solutions.", 5},
			{"Pipe Fencing", "Durable pipe fencing for property boundaries and security.", 6},
			{"Handrails & Stair Systems", "Code-compliant handrails and stair systems for residential and commercial buildings.", 7},
			{"Trailer Repairs", "Structural and mechanical trailer repair and fabrication.", 8},
			{"Heavy Equipment Repair", "On-site and shop-based heavy equipment welding and repair.", 9},
			{"Industrial Fabrication", "Custom industrial components, brackets, mounts, and assemblies.", 10},
			{"On-Site Welding", "Mobile welding services for jobs that require on-location work.", 11},
		}
		for _, s := range services {
			DB.ExecContext(ctx,
				"INSERT INTO services (name, description, sort_order) VALUES ($1, $2, $3)",
				s.name, s.description, s.order,
			)
		}
	}

	// Seed gallery categories if empty
	count = 0
	DB.QueryRowContext(ctx, "SELECT COUNT(*) FROM gallery").Scan(&count)
	if count == 0 {
		galleryItems := []struct {
			title, description, category, imageURL string
		}{
			{"Custom Arch Gate", "Hand-forged arch gate with scrollwork", "Gates", "/gallery/gate-1.jpg"},
			{"Pipe Fence Installation", "3-rail pipe fence along property line", "Fencing", "/gallery/fence-1.jpg"},
			{"Structural Beam", "Commercial steel beam installation", "Structural Steel", "/gallery/beam-1.jpg"},
			{"Equipment Repair", "Heavy equipment hydraulic arm repair", "Repairs", "/gallery/repair-1.jpg"},
			{"Custom Stairway", "Industrial spiral staircase fabrication", "Fabrication", "/gallery/stairs-1.jpg"},
			{"Commercial Canopy", "Steel canopy for commercial building", "Commercial", "/gallery/commercial-1.jpg"},
		}
		for _, g := range galleryItems {
			DB.ExecContext(ctx,
				"INSERT INTO gallery (title, description, category, image_url) VALUES ($1, $2, $3, $4)",
				g.title, g.description, g.category, g.imageURL,
			)
		}
	}

	return nil
}

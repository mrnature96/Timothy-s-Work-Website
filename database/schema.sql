-- Tim's Welding & Fabrication Database Schema

-- Quotes table
CREATE TABLE IF NOT EXISTS quotes (
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
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0
);

-- Indexes for performance
CREATE INDEX idx_quotes_status ON quotes(status);
CREATE INDEX idx_quotes_city ON quotes(city);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_quotes_created ON quotes(created_at DESC);

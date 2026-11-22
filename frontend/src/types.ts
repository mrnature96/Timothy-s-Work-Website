export interface Service {
  id: number;
  name: string;
  description: string;
  sort_order: number;
}

export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  category: string;
  image_url: string;
  created_at: string;
}

export interface Quote {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  city: string;
  project_type: string;
  project_description: string;
  budget_range: string;
  desired_completion_date: string;
  status: string;
  created_at: string;
}

export interface SubmitQuoteRequest {
  full_name: string;
  phone: string;
  email: string;
  city: string;
  project_type: string;
  project_description?: string;
  budget_range?: string;
  desired_completion_date?: string;
}

export interface SubmitQuoteResponse {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  city: string;
  project_type: string;
  status: string;
  created_at: string;
}

export interface HealthResponse {
  status: string;
  service: string;
}

export type QuoteStatus = 'new' | 'reviewing' | 'quoted' | 'scheduled' | 'completed';

export const PROJECT_TYPES = [
  "Custom Metal Fabrication",
  "Structural Steel",
  "Welding Repair",
  "Ranch & Farm Welding",
  "Gates & Entrances",
  "Pipe Fencing",
  "Handrails & Stair Systems",
  "Trailer Repairs",
  "Heavy Equipment Repair",
  "Industrial Fabrication",
  "On-Site Welding",
  "Other",
];

export const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $25,000",
  "$25,000+",
  "Not sure yet",
];

export const GALLERY_CATEGORIES = [
  "All",
  "Gates",
  "Fencing",
  "Structural Steel",
  "Repairs",
  "Fabrication",
  "Commercial",
];

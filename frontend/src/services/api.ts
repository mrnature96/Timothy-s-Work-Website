const API_BASE = process.env.REACT_APP_API_URL || '/api/v1';

export async function fetchServices(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/services`);
  if (!res.ok) throw new Error('Failed to fetch services');
  return res.json();
}

export async function fetchGallery(category?: string): Promise<any[]> {
  const url = category ? `${API_BASE}/gallery?category=${encodeURIComponent(category)}` : `${API_BASE}/gallery`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch gallery');
  return res.json();
}

export async function submitQuote(data: any): Promise<any> {
  const res = await fetch(`${API_BASE}/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Submission failed' }));
    throw new Error(err.error || 'Submission failed');
  }
  return res.json();
}

export async function fetchQuotes(status?: string): Promise<any[]> {
  const url = status ? `${API_BASE}/quotes?status=${status}` : `${API_BASE}/quotes`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch quotes');
  return res.json();
}

export async function updateQuoteStatus(id: number, status: string): Promise<any> {
  const res = await fetch(`${API_BASE}/quotes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update quote status');
  return res.json();
}

export async function checkHealth(): Promise<{ status: string; service: string }> {
  const res = await fetch(`${API_BASE}/health`);
  if (!res.ok) throw new Error('Health check failed');
  return res.json();
}

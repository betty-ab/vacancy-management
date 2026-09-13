// src/lib/api.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const api = {
  // Companies
  async getCompanies() {
    const res = await fetch(`${API_BASE_URL}/companies`);
    if (!res.ok) throw new Error('Failed to fetch companies');
    return res.json();
  },

  async getCompany(id: string) {
    const res = await fetch(`${API_BASE_URL}/companies/${id}`);
    if (!res.ok) throw new Error('Failed to fetch company');
    return res.json();
  },

  // Vacancies
  async getVacancies(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {});
    const res = await fetch(`${API_BASE_URL}/vacancies?${params}`);
    if (!res.ok) throw new Error('Failed to fetch vacancies');
    return res.json();
  },

  async getVacancy(id: string) {
    const res = await fetch(`${API_BASE_URL}/vacancies/${id}`);
    if (!res.ok) throw new Error('Failed to fetch vacancy');
    return res.json();
  },

  // Applications
  async submitApplication(data: any) {
    const res = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to submit application');
    }
    return res.json();
  },

  async getCandidates(filters?: Record<string, string>) {
    const params = new URLSearchParams(filters || {});
    const res = await fetch(`${API_BASE_URL}/applications?${params}`);
    if (!res.ok) throw new Error('Failed to fetch candidates');
    return res.json();
  },

  async getCandidate(id: string) {
    const res = await fetch(`${API_BASE_URL}/applications/${id}`);
    if (!res.ok) throw new Error('Failed to fetch candidate');
    return res.json();
  },

  async updateCandidateStatus(id: string, status: string) {
    const res = await fetch(`${API_BASE_URL}/applications/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update status');
    }
    return res.json();
  },

  async addCandidateNote(id: string, text: string) {
    const res = await fetch(`${API_BASE_URL}/applications/${id}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to add note');
    }
    return res.json();
  },

  async getStats() {
    const res = await fetch(`${API_BASE_URL}/applications/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  // References
  async getDepartments() {
    const res = await fetch(`${API_BASE_URL}/references/departments`);
    if (!res.ok) throw new Error('Failed to fetch departments');
    return res.json();
  },

  async getLocations() {
    const res = await fetch(`${API_BASE_URL}/references/locations`);
    if (!res.ok) throw new Error('Failed to fetch locations');
    return res.json();
  },

  async getPipelineStages() {
    const res = await fetch(`${API_BASE_URL}/references/pipeline-stages`);
    if (!res.ok) throw new Error('Failed to fetch pipeline stages');
    return res.json();
  },

  async getJobCategories() {
    const res = await fetch(`${API_BASE_URL}/references/job-categories`);
    if (!res.ok) throw new Error('Failed to fetch job categories');
    return res.json();
  }
};
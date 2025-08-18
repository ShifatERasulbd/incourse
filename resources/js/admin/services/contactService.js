import axios from 'axios';

const API_BASE_URL = '/api';

// Create axios instance with proper configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Contact Service
 * Handles all contact-related API calls for the admin panel
 */

const contactService = {
  // Get all contacts (admin)
  getAll: async () => {
    const response = await apiClient.get('/admin/contacts');
    return response.data;
  },

  // Get active contact (public)
  getActive: async () => {
    const response = await apiClient.get('/contact');
    return response.data;
  },

  // Get single contact
  get: async (id) => {
    const response = await apiClient.get(`/admin/contacts/${id}`);
    return response.data;
  },

  // Create contact
  create: async (formData) => {
    const response = await apiClient.post('/admin/contacts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update contact
  update: async (id, formData) => {
    const response = await apiClient.post(`/admin/contacts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT',
      },
    });
    return response.data;
  },

  // Delete contact
  delete: async (id) => {
    const response = await apiClient.delete(`/admin/contacts/${id}`);
    return response.data;
  },

  // Toggle active status
  toggleActive: async (id) => {
    const response = await apiClient.post(`/admin/contacts/${id}/toggle-active`);
    return response.data;
  },
};

export default contactService;

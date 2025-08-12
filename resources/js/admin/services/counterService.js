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

// Add request interceptor to include auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const counterService = {
  // Get all counters (admin)
  getAll: async () => {
    const response = await apiClient.get('/admin/counters');
    return response.data;
  },

  // Get active counters (public)
  getActive: async () => {
    const response = await apiClient.get('/counters/active');
    return response.data;
  },

  // Get single counter
  get: async (id) => {
    const response = await apiClient.get(`/admin/counters/${id}`);
    return response.data;
  },

  // Create counter
  create: async (formData) => {
    const response = await apiClient.post('/admin/counters', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update counter
  update: async ({ id, data }) => {
    const response = await apiClient.post(`/admin/counters/${id}?_method=PUT`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete counter
  delete: async (id) => {
    const response = await apiClient.delete(`/admin/counters/${id}`);
    return response.data;
  },

  // Update order of counters
  updateOrder: async (counters) => {
    const response = await apiClient.post('/admin/counters/update-order', { counters });
    return response.data;
  },
};

export default counterService;

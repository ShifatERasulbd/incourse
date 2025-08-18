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

const categoryService = {
  // Get all categories (admin)
  getAll: async () => {
    const response = await apiClient.get('/admin/categories');
    return response.data;
  },

  // Get active categories (public)
  getActive: async () => {
    const response = await apiClient.get('/categories/active');
    return response.data;
  },

  // Get single category
  get: async (id) => {
    const response = await apiClient.get(`/admin/categories/${id}`);
    return response.data;
  },

  // Create category
  create: async (formData) => {
    const response = await apiClient.post('/admin/categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update category
  update: async ({ id, data }) => {
    const response = await apiClient.post(`/admin/categories/${id}?_method=PUT`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete category
  delete: async (id) => {
    const response = await apiClient.delete(`/admin/categories/${id}`);
    return response.data;
  },
};

export default categoryService;

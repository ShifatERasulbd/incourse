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

const productService = {
  // Get all products (admin)
  getAll: async (params = {}) => {
    const response = await apiClient.get('/admin/products', { params });
    return response.data;
  },

  // Get active products (public)
  getActive: async (params = {}) => {
    const response = await apiClient.get('/products/active', { params });
    return response.data;
  },

  // Get single product
  get: async (id) => {
    const response = await apiClient.get(`/admin/products/${id}`);
    return response.data;
  },

  // Create product
  create: async (formData) => {
    const response = await apiClient.post('/admin/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update product
  update: async ({ id, data }) => {
    const response = await apiClient.post(`/admin/products/${id}?_method=PUT`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete product
  delete: async (id) => {
    const response = await apiClient.delete(`/admin/products/${id}`);
    return response.data;
  },
};

export default productService;

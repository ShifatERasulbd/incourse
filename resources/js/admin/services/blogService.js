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

const blogService = {
  // Get all blogs (admin)
  getAll: async (params = {}) => {
    const response = await apiClient.get('/admin/blogs', { params });
    return response.data;
  },

  // Get published blogs (public)
  getPublished: async (params = {}) => {
    const response = await apiClient.get('/blogs/published', { params });
    return response.data;
  },

  // Get single blog
  get: async (id) => {
    const response = await apiClient.get(`/admin/blogs/${id}`);
    return response.data;
  },

  // Create blog
  create: async (formData) => {
    const response = await apiClient.post('/admin/blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update blog
  update: async ({ id, data }) => {
    const response = await apiClient.post(`/admin/blogs/${id}?_method=PUT`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete blog
  delete: async (id) => {
    const response = await apiClient.delete(`/admin/blogs/${id}`);
    return response.data;
  },
};

export default blogService;

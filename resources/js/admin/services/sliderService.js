
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

const sliderService = {
  // Get all sliders (admin)
  getAll: async () => {
    const response = await apiClient.get('/admin/sliders');
    return response.data;
  },

  // Get active sliders (public)
  getActive: async () => {
    const response = await apiClient.get('/sliders/active');
    return response.data;
  },

  // Get single slider
  getById: async (id) => {
    const response = await apiClient.get(`/admin/sliders/${id}`);
    return response.data;
  },

  // Create new slider
  create: async (formData) => {
    const response = await apiClient.post('/admin/sliders', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update slider
  update: async (id, formData) => {
    const response = await apiClient.post(`/admin/sliders/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-HTTP-Method-Override': 'PUT',
      },
    });
    return response.data;
  },

  // Delete slider
  delete: async (id) => {
    const response = await apiClient.delete(`/admin/sliders/${id}`);
    return response.data;
  },

  // Update slider order
  updateOrder: async (sliders) => {
    const response = await apiClient.post('/admin/sliders/update-order', {
      sliders,
    });
    return response.data;
  },
};

export default sliderService;

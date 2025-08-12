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

const whyChooseUsService = {
  // Get all why choose us items (admin)
  getAll: async () => {
    const response = await apiClient.get('/admin/why-choose-us');
    return response.data;
  },

  // Get active why choose us items (public)
  getActive: async () => {
    const response = await apiClient.get('/why-choose-us/active');
    return response.data;
  },

  // Get single why choose us item
  get: async (id) => {
    const response = await apiClient.get(`/admin/why-choose-us/${id}`);
    return response.data;
  },

  // Create why choose us item
  create: async (formData) => {
    const response = await apiClient.post('/admin/why-choose-us', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Update why choose us item
  update: async ({ id, data }) => {
    const response = await apiClient.post(`/admin/why-choose-us/${id}?_method=PUT`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete why choose us item
  delete: async (id) => {
    const response = await apiClient.delete(`/admin/why-choose-us/${id}`);
    return response.data;
  },

  // Update order of items
  updateOrder: async (items) => {
    const response = await apiClient.post('/admin/why-choose-us/update-order', { items });
    return response.data;
  },
};

export default whyChooseUsService;

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

const aboutUsService = {
  // Get about us content (admin)
  get: async () => {
    const response = await apiClient.get('/admin/about-us');
    return response.data;
  },

  // Get active about us content (public)
  getActive: async () => {
    const response = await apiClient.get('/about-us/active');
    return response.data;
  },

  // Save about us content
  save: async (formData) => {
    const response = await apiClient.post('/admin/about-us', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export default aboutUsService;

import axios from 'axios';

const API_BASE_URL = '/api/frontend';

// Create axios instance for frontend API calls
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
});

// Response interceptor to handle errors gracefully
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Frontend API Error:', error);
    return Promise.reject(error);
  }
);

const frontendService = {
  // Get all frontend data in one request (for initial page load)
  getAllData: async () => {
    try {
      const response = await apiClient.get('/all-data');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch all frontend data:', error);
      return { success: false, data: null };
    }
  },

  // Get homepage specific data
  getHomepageData: async () => {
    try {
      const response = await apiClient.get('/homepage');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch homepage data:', error);
      return { success: false, data: null };
    }
  },

  // Get sliders
  getSliders: async () => {
    try {
      const response = await apiClient.get('/sliders');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch sliders:', error);
      return { success: false, data: [] };
    }
  },

  // Get about us data
  getAboutUs: async () => {
    try {
      const response = await apiClient.get('/about-us');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch about us data:', error);
      return { success: false, data: null };
    }
  },

  // Get products with optional filters
  getProducts: async (params = {}) => {
    try {
      const response = await apiClient.get('/products', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      return { success: false, data: [] };
    }
  },

  // Get categories
  getCategories: async () => {
    try {
      const response = await apiClient.get('/categories');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return { success: false, data: [] };
    }
  },

  // Get blogs with optional filters
  getBlogs: async (params = {}) => {
    try {
      const response = await apiClient.get('/blogs', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      return { success: false, data: [] };
    }
  },

  // Get why choose us items
  getWhyChooseUs: async () => {
    try {
      // Use the active endpoint directly since it's public
      const response = await axios.create().get('/api/why-choose-us/active');

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Failed to fetch why choose us items:', error);
      return { success: false, data: [] };
    }
  },

  // Get counters
  getCounters: async () => {
    try {
      const response = await axios.create().get('/api/counters/active');

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Failed to fetch counters:', error);
      return { success: false, data: [] };
    }
  },

  // Utility method to get featured content
  getFeaturedContent: async () => {
    try {
      const [products, blogs] = await Promise.all([
        frontendService.getProducts({ featured: true, limit: 6 }),
        frontendService.getBlogs({ featured: true, limit: 3 })
      ]);

      return {
        success: true,
        data: {
          featuredProducts: products.success ? products.data : [],
          featuredBlogs: blogs.success ? blogs.data : []
        }
      };
    } catch (error) {
      console.error('Failed to fetch featured content:', error);
      return { success: false, data: null };
    }
  },

  // Search across products and blogs
  search: async (query, type = 'all') => {
    try {
      const promises = [];
      
      if (type === 'all' || type === 'products') {
        promises.push(frontendService.getProducts({ search: query }));
      }
      
      if (type === 'all' || type === 'blogs') {
        promises.push(frontendService.getBlogs({ search: query }));
      }

      const results = await Promise.all(promises);
      
      return {
        success: true,
        data: {
          products: type !== 'blogs' ? (results[0]?.success ? results[0].data : []) : [],
          blogs: type !== 'products' ? (results[type === 'all' ? 1 : 0]?.success ? results[type === 'all' ? 1 : 0].data : []) : []
        }
      };
    } catch (error) {
      console.error('Failed to search:', error);
      return { success: false, data: null };
    }
  }
};

export default frontendService;

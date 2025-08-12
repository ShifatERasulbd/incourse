import { useState, useEffect } from 'react';
import frontendService from '../services/frontendService';

// Custom hook for fetching frontend data
export const useFrontendData = (dataType, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let result;
        
        switch (dataType) {
          case 'sliders':
            result = await frontendService.getSliders();
            break;
          case 'aboutUs':
            result = await frontendService.getAboutUs();
            break;
          case 'products':
            result = await frontendService.getProducts(params);
            break;
          case 'categories':
            result = await frontendService.getCategories();
            break;
          case 'blogs':
            result = await frontendService.getBlogs(params);
            break;
          case 'whyChooseUs':
            result = await frontendService.getWhyChooseUs();
            break;
          case 'counters':
            result = await frontendService.getCounters();
            break;
          case 'homepage':
            result = await frontendService.getHomepageData();
            break;
          case 'all':
            result = await frontendService.getAllData();
            break;
          default:
            throw new Error(`Unknown data type: ${dataType}`);
        }

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || 'Failed to fetch data');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data');
        console.error(`Error fetching ${dataType}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dataType, JSON.stringify(params)]);

  return { data, loading, error };
};

// Hook for homepage data
export const useHomepageData = () => {
  return useFrontendData('homepage');
};

// Hook for sliders
export const useSliders = () => {
  return useFrontendData('sliders');
};

// Hook for about us data
export const useAboutUs = () => {
  return useFrontendData('aboutUs');
};

// Hook for products with optional filters
export const useProducts = (filters = {}) => {
  return useFrontendData('products', filters);
};

// Hook for categories
export const useCategories = () => {
  return useFrontendData('categories');
};

// Hook for blogs with optional filters
export const useBlogs = (filters = {}) => {
  return useFrontendData('blogs', filters);
};

// Hook for why choose us items
export const useWhyChooseUs = () => {
  return useFrontendData('whyChooseUs');
};

// Hook for counters
export const useCounters = () => {
  return useFrontendData('counters');
};

// Hook for search functionality
export const useSearch = (query, type = 'all') => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim() === '') {
      setResults(null);
      setLoading(false);
      return;
    }

    const performSearch = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await frontendService.search(query.trim(), type);
        
        if (result.success) {
          setResults(result.data);
        } else {
          setError(result.message || 'Search failed');
        }
      } catch (err) {
        setError(err.message || 'An error occurred during search');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timeoutId = setTimeout(performSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [query, type]);

  return { results, loading, error };
};

// Hook for featured content
export const useFeaturedContent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      try {
        const result = await frontendService.getFeaturedContent();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || 'Failed to fetch featured content');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching featured content');
        console.error('Error fetching featured content:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedContent();
  }, []);

  return { data, loading, error };
};

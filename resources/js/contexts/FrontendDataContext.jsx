import React, { createContext, useContext, useState, useEffect } from 'react';
import frontendService from '../services/frontendService';

// Create the context
const FrontendDataContext = createContext();

// Custom hook to use the context
export const useFrontendDataContext = () => {
  const context = useContext(FrontendDataContext);
  if (!context) {
    throw new Error('useFrontendDataContext must be used within a FrontendDataProvider');
  }
  return context;
};

// Provider component
export const FrontendDataProvider = ({ children }) => {
  const [data, setData] = useState({
    sliders: [],
    aboutUs: null,
    categories: [],
    products: [],
    blogs: [],
    whyChooseUs: [],
    counters: [],
    featuredProducts: [],
    featuredBlogs: [],
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all data at once for better performance
        const result = await frontendService.getAllData();
        
        if (result.success && result.data) {
          setData({
            sliders: result.data.sliders || [],
            aboutUs: result.data.aboutUs || null,
            categories: result.data.categories || [],
            products: result.data.products || [],
            blogs: result.data.blogs || [],
            whyChooseUs: result.data.whyChooseUs || [],
            counters: result.data.counters || [],
            featuredProducts: result.data.products?.filter(p => p.is_featured) || [],
            featuredBlogs: result.data.blogs?.filter(b => b.is_featured) || [],
          });
        } else {
          setError(result.message || 'Failed to load data');
        }
      } catch (err) {
        setError(err.message || 'An error occurred while loading data');
        console.error('Frontend data loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Refresh specific data type
  const refreshData = async (dataType) => {
    try {
      let result;
      
      switch (dataType) {
        case 'sliders':
          result = await frontendService.getSliders();
          if (result.success) {
            setData(prev => ({ ...prev, sliders: result.data }));
          }
          break;
          
        case 'aboutUs':
          result = await frontendService.getAboutUs();
          if (result.success) {
            setData(prev => ({ ...prev, aboutUs: result.data }));
          }
          break;
          
        case 'products':
          result = await frontendService.getProducts();
          if (result.success) {
            setData(prev => ({ 
              ...prev, 
              products: result.data,
              featuredProducts: result.data.filter(p => p.is_featured)
            }));
          }
          break;
          
        case 'categories':
          result = await frontendService.getCategories();
          if (result.success) {
            setData(prev => ({ ...prev, categories: result.data }));
          }
          break;
          
        case 'blogs':
          result = await frontendService.getBlogs();
          if (result.success) {
            setData(prev => ({
              ...prev,
              blogs: result.data,
              featuredBlogs: result.data.filter(b => b.is_featured)
            }));
          }
          break;

        case 'whyChooseUs':
          result = await frontendService.getWhyChooseUs();
          if (result.success) {
            setData(prev => ({ ...prev, whyChooseUs: result.data }));
          }
          break;

        case 'counters':
          result = await frontendService.getCounters();
          if (result.success) {
            setData(prev => ({ ...prev, counters: result.data }));
          }
          break;
          
        default:
          console.warn(`Unknown data type for refresh: ${dataType}`);
      }
    } catch (err) {
      console.error(`Error refreshing ${dataType}:`, err);
    }
  };

  // Search functionality
  const search = async (query, type = 'all') => {
    try {
      const result = await frontendService.search(query, type);
      return result;
    } catch (err) {
      console.error('Search error:', err);
      return { success: false, data: null };
    }
  };

  // Get filtered products
  const getFilteredProducts = (categoryName) => {
    if (!categoryName || categoryName === 'All') {
      return data.products;
    }
    return data.products.filter(product => product.category?.name === categoryName);
  };

  // Context value
  const contextValue = {
    // Data
    data,
    loading,
    error,
    
    // Actions
    refreshData,
    search,
    getFilteredProducts,
    
    // Computed values
    isDataLoaded: !loading && !error,
    hasSliders: data.sliders.length > 0,
    hasProducts: data.products.length > 0,
    hasBlogs: data.blogs.length > 0,
    hasAboutUs: !!data.aboutUs,
    hasWhyChooseUs: data.whyChooseUs.length > 0,
    hasCounters: data.counters.length > 0,
  };

  return (
    <FrontendDataContext.Provider value={contextValue}>
      {children}
    </FrontendDataContext.Provider>
  );
};

export default FrontendDataContext;

import axios from 'axios';

const API_BASE_URL = '/api';

// Create axios instance with base config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ✅ important for Laravel Sanctum cookies
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach CSRF token & Bearer token
apiClient.interceptors.request.use((config) => {
  // CSRF token for Sanctum (only needed for POST, PUT, DELETE)
  const csrfToken = document.querySelector('meta[name="csrf-token"]');
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken.getAttribute('content');
  }

  // Bearer token for API token authentication
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// Simple error logger
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Helper to ensure CSRF cookie is loaded for Sanctum
const ensureCsrf = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true });
  } catch (error) {
    console.error('CSRF cookie fetch failed', error);
  }
};

/**
 * Setting Service
 */
export const getAllSettings = async () => {
  try {
    const response = await apiClient.get('/frontend/admin/settings/public');
    if (response.status === 200 && response.data?.success) {
      return response.data;
    }
    return {
      success: false,
      data: [],
      message: response.data?.message || 'Invalid response from server',
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || 'Failed to load settings',
    };
  }
};

export const getSetting = async (id) => {
  try {
    const response = await apiClient.get('/admin/settings/public');
    if (response.data.success) {
      const setting = response.data.data.find((s) => s.id === parseInt(id));
      return {
        success: true,
        data: setting || null,
        message: setting ? 'Setting found' : 'Setting not found',
      };
    }
    return response.data;
  } catch (error) {
    return {
      success: false,
      data: null,
      message: 'Failed to load setting',
    };
  }
};

export const createSetting = async (settingData) => {
  try {
    await ensureCsrf(); // ✅ Sanctum requires this before POST
    const response = await apiClient.post('/admin/settings', settingData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to create setting',
      errors: error.response?.data?.errors || {},
    };
  }
};

export const updateSetting = async (id, settingData) => {
  try {
    await ensureCsrf();
    const response = await apiClient.put(`/admin/settings/${id}`, settingData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to update setting',
      errors: error.response?.data?.errors || {},
    };
  }
};

export const deleteSetting = async (id) => {
  try {
    await ensureCsrf();
    const response = await apiClient.delete(`/admin/settings/${id}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to delete setting',
    };
  }
};

export const toggleSettingActive = async (id) => {
  try {
    await ensureCsrf();
    const response = await apiClient.post(`/admin/settings/${id}/toggle-active`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to toggle setting status',
    };
  }
};

export const getSettingsByGroup = async (group) => {
  try {
    const response = await apiClient.get('/public/settings');
    if (response.data.success) {
      const filteredSettings = response.data.data.filter(
        (setting) => setting.group === group
      );
      return {
        success: true,
        data: filteredSettings,
        message: `Settings for group '${group}' loaded successfully`,
      };
    }
    return response.data;
  } catch (error) {
    return {
      success: false,
      data: [],
      message: 'Failed to load settings by group',
    };
  }
};

export const updateSettingByKey = async (key, value) => {
  try {
    const allSettings = await getAllSettings();
    if (allSettings.success) {
      const setting = allSettings.data.find((s) => s.key === key);
      if (setting) {
        return await updateSetting(setting.id, { ...setting, value });
      }
    }
    return {
      success: false,
      message: `Setting with key '${key}' not found`,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update setting by key',
    };
  }
};

export const getSettingByKey = async (key) => {
  try {
    const allSettings = await getAllSettings();
    if (allSettings.success) {
      const setting = allSettings.data.find((s) => s.key === key);
      return {
        success: true,
        data: setting || null,
        message: setting ? 'Setting found' : 'Setting not found',
      };
    }
    return allSettings;
  } catch (error) {
    return {
      success: false,
      data: null,
      message: 'Failed to get setting by key',
    };
  }
};

export default {
  getAllSettings,
  getSetting,
  createSetting,
  updateSetting,
  deleteSetting,
  toggleSettingActive,
  getSettingsByGroup,
  updateSettingByKey,
  getSettingByKey,
};

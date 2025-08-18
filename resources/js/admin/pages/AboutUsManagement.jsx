import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Alert,
  Snackbar,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  Save as SaveIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import aboutUsService from '../services/aboutUsService';

const AboutUsManagement = () => {
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    section_title: 'About Us',
    main_text: '',
    show_banner: true,
    is_active: true,
    banner_image: null,
    main_image: null,
  });

  const queryClient = useQueryClient();

  const { data: aboutUs, isLoading, error } = useQuery({
    queryKey: ['aboutUs'],
    queryFn: aboutUsService.get,
  });

  // Update form data when aboutUs data changes
  useEffect(() => {
    if (aboutUs) {
      setFormData({
        section_title: aboutUs.section_title || 'About Us',
        main_text: aboutUs.main_text || '',
        show_banner: aboutUs.show_banner ?? true,
        is_active: aboutUs.is_active ?? true,
        banner_image: null,
        main_image: null,
      });
    }
  }, [aboutUs]);

  const saveMutation = useMutation({
    mutationFn: aboutUsService.save,
    onSuccess: () => {
      queryClient.invalidateQueries(['aboutUs']);
      showSnackbar('About Us content saved successfully', 'success');
      setValidationErrors({});
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
      showSnackbar(error.response?.data?.message || 'Failed to save content', 'error');
    },
  });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationErrors({});
    
    const submitData = new FormData();
    submitData.append('section_title', formData.section_title);
    submitData.append('main_text', formData.main_text);
    submitData.append('show_banner', formData.show_banner ? '1' : '0');
    submitData.append('is_active', formData.is_active ? '1' : '0');
    
    if (formData.banner_image) {
      submitData.append('banner_image', formData.banner_image);
    }
    
    if (formData.main_image) {
      submitData.append('main_image', formData.main_image);
    }

    saveMutation.mutate(submitData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        About Us Management
      </Typography>

      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Section Title */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Section Title"
                value={formData.section_title}
                onChange={(e) => handleInputChange('section_title', e.target.value)}
                error={!!validationErrors.section_title}
                helperText={validationErrors.section_title?.[0]}
                required
              />
            </Grid>

            {/* Main Text */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Main Text"
                value={formData.main_text}
                onChange={(e) => handleInputChange('main_text', e.target.value)}
                multiline
                rows={6}
                error={!!validationErrors.main_text}
                helperText={validationErrors.main_text?.[0]}
                required
              />
            </Grid>

            {/* Banner Image */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Banner Image
                  </Typography>
                  {aboutUs?.banner_image_path && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={`/${aboutUs.banner_image_path}`}
                      alt="Current Banner"
                      sx={{ mb: 2, borderRadius: 1 }}
                    />
                  )}
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="banner-image-upload"
                    type="file"
                    onChange={(e) => handleInputChange('banner_image', e.target.files[0])}
                  />
                  <label htmlFor="banner-image-upload">
                    <Button variant="outlined" component="span" startIcon={<ImageIcon />} fullWidth>
                      {formData.banner_image ? formData.banner_image.name : 'Upload Banner Image'}
                    </Button>
                  </label>
                  {validationErrors.banner_image && (
                    <Typography variant="caption" display="block" sx={{ mt: 1, color: 'error.main' }}>
                      {validationErrors.banner_image[0]}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Main Image */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Main Image
                  </Typography>
                  {aboutUs?.main_image_path && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={`/${aboutUs.main_image_path}`}
                      alt="Current Main Image"
                      sx={{ mb: 2, borderRadius: 1 }}
                    />
                  )}
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="main-image-upload"
                    type="file"
                    onChange={(e) => handleInputChange('main_image', e.target.files[0])}
                  />
                  <label htmlFor="main-image-upload">
                    <Button variant="outlined" component="span" startIcon={<ImageIcon />} fullWidth>
                      {formData.main_image ? formData.main_image.name : 'Upload Main Image'}
                    </Button>
                  </label>
                  {validationErrors.main_image && (
                    <Typography variant="caption" display="block" sx={{ mt: 1, color: 'error.main' }}>
                      {validationErrors.main_image[0]}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Settings */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.show_banner}
                      onChange={(e) => handleInputChange('show_banner', e.target.checked)}
                    />
                  }
                  label="Show Banner"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_active}
                      onChange={(e) => handleInputChange('is_active', e.target.checked)}
                    />
                  }
                  label="Active"
                />
              </Box>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={saveMutation.isPending}
                size="large"
              >
                {saveMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AboutUsManagement;

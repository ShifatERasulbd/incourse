import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Alert,
  Snackbar,
  IconButton,
  Chip,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import whyChooseUsService from '../services/whyChooseUsService';

const WhyChooseUs = () => {
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    icon_type: 'class',
    icon_color: '#c41c13',
    order: '',
    is_active: true,
    icon_image: null,
  });

  const queryClient = useQueryClient();

  const { data: items, isLoading } = useQuery({
    queryKey: ['whyChooseUs'],
    queryFn: whyChooseUsService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: whyChooseUsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['whyChooseUs']);
      handleClose();
      showSnackbar('Why Choose Us item created successfully', 'success');
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
      showSnackbar(error.response?.data?.message || 'Failed to create item', 'error');
    },
  });

  const updateMutation = useMutation({
    mutationFn: whyChooseUsService.update,
    onSuccess: () => {
      queryClient.invalidateQueries(['whyChooseUs']);
      handleClose();
      showSnackbar('Why Choose Us item updated successfully', 'success');
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
      showSnackbar(error.response?.data?.message || 'Failed to update item', 'error');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: whyChooseUsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['whyChooseUs']);
      showSnackbar('Why Choose Us item deleted successfully', 'success');
    },
    onError: (error) => {
      showSnackbar(error.response?.data?.message || 'Failed to delete item', 'error');
    },
  });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCreate = () => {
    setEditingItem(null);
    setOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      icon: item.icon || '',
      icon_type: item.icon_type,
      icon_color: item.icon_color || '#c41c13',
      order: item.order,
      is_active: item.is_active,
      icon_image: null,
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
    setValidationErrors({});
    setFormData({
      title: '',
      description: '',
      icon: '',
      icon_type: 'class',
      icon_color: '#c41c13',
      order: '',
      is_active: true,
      icon_image: null,
    });
  };

  const handleSubmit = () => {
    setValidationErrors({});
    
    const submitData = new FormData();
    submitData.append('title', formData.title.trim());
    submitData.append('description', formData.description.trim());
    submitData.append('icon_type', formData.icon_type);
    submitData.append('icon_color', formData.icon_color);
    submitData.append('is_active', formData.is_active ? '1' : '0');
    
    if (formData.icon.trim()) {
      submitData.append('icon', formData.icon.trim());
    }
    
    if (formData.order) {
      submitData.append('order', formData.order);
    }
    
    if (formData.icon_image) {
      submitData.append('icon_image', formData.icon_image);
    }

    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    {
      field: 'icon',
      headerName: 'Icon',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {params.row.icon_type === 'image' && params.row.icon ? (
            <img
              src={`/${params.row.icon}`}
              alt="Icon"
              style={{
                width: 30,
                height: 30,
                objectFit: 'contain',
              }}
            />
          ) : params.row.icon ? (
            <i 
              className={params.row.icon} 
              style={{ 
                fontSize: '24px', 
                color: params.row.icon_color || '#c41c13' 
              }}
            />
          ) : (
            <ImageIcon color="disabled" />
          )}
        </Box>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 300,
      renderCell: (params) => (
        <div style={{ 
          whiteSpace: 'normal', 
          wordWrap: 'break-word',
          maxHeight: '60px',
          overflow: 'hidden'
        }}>
          {params.value}
        </div>
      ),
    },
    { field: 'order', headerName: 'Order', width: 80 },
    {
      field: 'is_active',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            onClick={() => handleEdit(params.row)}
            color="primary"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleDelete(params.row.id)}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Why Choose Us</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Add Item
        </Button>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={items || []}
          columns={columns}
          loading={isLoading}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Paper>

      {/* Create/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingItem ? 'Edit Why Choose Us Item' : 'Create New Why Choose Us Item'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  margin="normal"
                  required
                  error={!!validationErrors.title}
                  helperText={validationErrors.title?.[0]}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  margin="normal"
                  multiline
                  rows={3}
                  required
                  error={!!validationErrors.description}
                  helperText={validationErrors.description?.[0]}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Icon Type</InputLabel>
                  <Select
                    value={formData.icon_type}
                    onChange={(e) => setFormData({ ...formData, icon_type: e.target.value, icon: '', icon_image: null })}
                    label="Icon Type"
                  >
                    <MenuItem value="class">CSS Icon Class</MenuItem>
                    <MenuItem value="image">Upload Image</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Order"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  margin="normal"
                  type="number"
                  error={!!validationErrors.order}
                  helperText={validationErrors.order?.[0]}
                />
              </Grid>

              {formData.icon_type === 'class' ? (
                <>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      label="Icon Class (e.g., fas fa-star, material-icons)"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      margin="normal"
                      placeholder="fas fa-star"
                      error={!!validationErrors.icon}
                      helperText={validationErrors.icon?.[0] || "Use Font Awesome, Material Icons, or any CSS icon class"}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <TextField
                      fullWidth
                      label="Icon Color"
                      value={formData.icon_color}
                      onChange={(e) => setFormData({ ...formData, icon_color: e.target.value })}
                      margin="normal"
                      type="color"
                    />
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ mt: 2 }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="icon-image-upload"
                      type="file"
                      onChange={(e) => setFormData({ ...formData, icon_image: e.target.files[0] })}
                    />
                    <label htmlFor="icon-image-upload">
                      <Button variant="outlined" component="span" startIcon={<ImageIcon />}>
                        {formData.icon_image ? formData.icon_image.name : 'Upload Icon Image'}
                      </Button>
                    </label>
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      Recommended size: 64x64px or smaller
                    </Typography>
                    {validationErrors.icon_image && (
                      <Typography variant="caption" display="block" sx={{ mt: 1, color: 'error.main' }}>
                        {validationErrors.icon_image[0]}
                      </Typography>
                    )}
                  </Box>
                </Grid>
              )}

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                    />
                  }
                  label="Active"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

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

export default WhyChooseUs;

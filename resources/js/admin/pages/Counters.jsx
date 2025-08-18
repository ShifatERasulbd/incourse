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
import counterService from '../services/counterService';

const Counters = () => {
  const [open, setOpen] = useState(false);
  const [editingCounter, setEditingCounter] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    label: '',
    value: 0,
    suffix: '',
    icon: '',
    icon_type: 'class',
    icon_color: '#272863',
    order: '',
    is_active: true,
    icon_image: null,
  });

  const queryClient = useQueryClient();

  const { data: counters, isLoading } = useQuery({
    queryKey: ['counters'],
    queryFn: counterService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: counterService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['counters']);
      handleClose();
      showSnackbar('Counter created successfully', 'success');
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
      showSnackbar(error.response?.data?.message || 'Failed to create counter', 'error');
    },
  });

  const updateMutation = useMutation({
    mutationFn: counterService.update,
    onSuccess: () => {
      queryClient.invalidateQueries(['counters']);
      handleClose();
      showSnackbar('Counter updated successfully', 'success');
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
      showSnackbar(error.response?.data?.message || 'Failed to update counter', 'error');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: counterService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['counters']);
      showSnackbar('Counter deleted successfully', 'success');
    },
    onError: (error) => {
      showSnackbar(error.response?.data?.message || 'Failed to delete counter', 'error');
    },
  });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCreate = () => {
    setEditingCounter(null);
    setOpen(true);
  };

  const handleEdit = (counter) => {
    setEditingCounter(counter);
    setFormData({
      label: counter.label,
      value: counter.value,
      suffix: counter.suffix || '',
      icon: counter.icon || '',
      icon_type: counter.icon_type,
      icon_color: counter.icon_color || '#272863',
      order: counter.order,
      is_active: counter.is_active,
      icon_image: null,
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this counter?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCounter(null);
    setValidationErrors({});
    setFormData({
      label: '',
      value: 0,
      suffix: '',
      icon: '',
      icon_type: 'class',
      icon_color: '#272863',
      order: '',
      is_active: true,
      icon_image: null,
    });
  };

  const handleSubmit = () => {
    setValidationErrors({});
    
    const submitData = new FormData();
    submitData.append('label', formData.label.trim());
    submitData.append('value', formData.value);
    submitData.append('icon_type', formData.icon_type);
    submitData.append('icon_color', formData.icon_color);
    submitData.append('is_active', formData.is_active ? '1' : '0');
    
    if (formData.suffix.trim()) {
      submitData.append('suffix', formData.suffix.trim());
    }
    
    if (formData.icon.trim()) {
      submitData.append('icon', formData.icon.trim());
    }
    
    if (formData.order) {
      submitData.append('order', formData.order);
    }
    
    if (formData.icon_image) {
      submitData.append('icon_image', formData.icon_image);
    }

    if (editingCounter) {
      updateMutation.mutate({ id: editingCounter.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'label', headerName: 'Label', width: 200 },
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
                color: params.row.icon_color || '#272863' 
              }}
            />
          ) : (
            <ImageIcon color="disabled" />
          )}
        </Box>
      ),
    },
    { field: 'value', headerName: 'Value', width: 100 },
    { field: 'suffix', headerName: 'Suffix', width: 100 },
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
        <Typography variant="h4">Counters</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Add Counter
        </Button>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={counters || []}
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
          {editingCounter ? 'Edit Counter' : 'Create New Counter'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Label"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  margin="normal"
                  required
                  error={!!validationErrors.label}
                  helperText={validationErrors.label?.[0]}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) || 0 })}
                  margin="normal"
                  type="number"
                  required
                  error={!!validationErrors.value}
                  helperText={validationErrors.value?.[0]}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Suffix (e.g., +, %, K)"
                  value={formData.suffix}
                  onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                  margin="normal"
                  error={!!validationErrors.suffix}
                  helperText={validationErrors.suffix?.[0]}
                />
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

              {formData.icon_type === 'class' ? (
                <>
                  <Grid item xs={12} md={8}>
                    <TextField
                      fullWidth
                      label="Icon Class (e.g., fas fa-users, material-icons)"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      margin="normal"
                      placeholder="fas fa-users"
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

export default Counters;

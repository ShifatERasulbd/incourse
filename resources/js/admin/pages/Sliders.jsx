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
  IconButton,
  Alert,
  Snackbar,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import sliderService from '../services/sliderService';

const Sliders = () => {
  const [open, setOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sliderToDelete, setSliderToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    button_text: '',
    button_link: '',
    order: '',
    is_active: true,
    image: null,
  });

  const queryClient = useQueryClient();

  const { data: sliders, isLoading } = useQuery({
    queryKey: ['sliders'],
    queryFn: sliderService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: sliderService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['sliders']);
      handleClose();
      showSnackbar('Slider created successfully', 'success');
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
      showSnackbar(error.response?.data?.message || 'Failed to create slider', 'error');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => sliderService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['sliders']);
      handleClose();
      showSnackbar('Slider updated successfully', 'success');
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
      showSnackbar(error.response?.data?.message || 'Failed to update slider', 'error');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: sliderService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['sliders']);
      setDeleteDialogOpen(false);
      setSliderToDelete(null);
      showSnackbar('Slider deleted successfully', 'success');
    },
    onError: (error) => {
      showSnackbar(error.response?.data?.message || 'Failed to delete slider', 'error');
    },
  });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSlider(null);
    setValidationErrors({});
    setFormData({
      title: '',
      description: '',
      button_text: '',
      button_link: '',
      order: '',
      is_active: true,
      image: null,
    });
  };

  const handleEdit = (slider) => {
    setEditingSlider(slider);
    setFormData({
      title: slider.title,
      description: slider.description || '',
      button_text: slider.button_text || '',
      button_link: slider.button_link || '',
      order: slider.order.toString(),
      is_active: slider.is_active,
      image: null,
    });
    setOpen(true);
  };

  const handleDelete = (slider) => {
    setSliderToDelete(slider);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = () => {
    setValidationErrors({}); // Clear previous validation errors

    const submitData = new FormData();
    submitData.append('title', formData.title.trim());

    if (formData.description.trim()) {
      submitData.append('description', formData.description.trim());
    }

    if (formData.button_text.trim()) {
      submitData.append('button_text', formData.button_text.trim());
    }

    if (formData.button_link.trim()) {
      submitData.append('button_link', formData.button_link.trim());
    }

    submitData.append('order', formData.order || '0');
    submitData.append('is_active', formData.is_active ? '1' : '0');

    if (formData.image) {
      submitData.append('image', formData.image);
    }

    if (editingSlider) {
      updateMutation.mutate({ id: editingSlider.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
    {
      field: 'image_path',
      headerName: 'Image',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {params.value ? (
            <img
              src={`/${params.value}`}
              alt="Slider"
              style={{
                width: 40,
                height: 30,
                objectFit: 'cover',
                borderRadius: 4,
              }}
            />
          ) : (
            <ImageIcon color="disabled" />
          )}
        </Box>
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
      field: 'created_at',
      headerName: 'Created',
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row)}
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
        <Typography variant="h4" gutterBottom>
          Slider Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Slider
        </Button>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={sliders || []}
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
          {editingSlider ? 'Edit Slider' : 'Create New Slider'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
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
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              fullWidth
              label="Button Text"
              value={formData.button_text}
              onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Button Link"
              value={formData.button_link}
              onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
              margin="normal"
              error={!!validationErrors.button_link}
              helperText={validationErrors.button_link?.[0]}
            />
            <TextField
              fullWidth
              label="Order"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: e.target.value })}
              margin="normal"
              type="number"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                />
              }
              label="Active"
              sx={{ mt: 2 }}
            />
            <Box sx={{ mt: 2 }}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="image-upload"
                type="file"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
              <label htmlFor="image-upload">
                <Button variant="outlined" component="span" startIcon={<ImageIcon />}>
                  {formData.image ? formData.image.name : 'Upload Image'}
                </Button>
              </label>
              {!editingSlider && (
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  Image is required for new sliders
                </Typography>
              )}
              {validationErrors.image && (
                <Typography variant="caption" display="block" sx={{ mt: 1, color: 'error.main' }}>
                  {validationErrors.image[0]}
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={
              !formData.title || 
              (!editingSlider && !formData.image) ||
              createMutation.isPending ||
              updateMutation.isPending
            }
          >
            {editingSlider ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the slider "{sliderToDelete?.title}"?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => deleteMutation.mutate(sliderToDelete.id)}
            color="error"
            variant="contained"
            disabled={deleteMutation.isPending}
          >
            Delete
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

export default Sliders;

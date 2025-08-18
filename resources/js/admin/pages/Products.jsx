import React, { useState, useEffect } from 'react';
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Snackbar,
  IconButton,
  Chip,
  Grid,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import productService from '../services/productService';
import categoryService from '../services/categoryService';

const Products = () => {
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    short_description: '',
    redirection_url: '',
    sku: '',
    stock_quantity: '',
    category_id: '',
    specifications: [],
    features: [],
    is_featured: false,
    is_active: true,
    image: null,
  });

  const queryClient = useQueryClient();

  const { data: products, isLoading, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      handleClose();
      showSnackbar('Product created successfully', 'success');
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
      showSnackbar(error.response?.data?.message || 'Failed to create product', 'error');
    },
  });

  const updateMutation = useMutation({
    mutationFn: productService.update,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      handleClose();
      showSnackbar('Product updated successfully', 'success');
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
      showSnackbar(error.response?.data?.message || 'Failed to update product', 'error');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
      showSnackbar('Product deleted successfully', 'success');
    },
    onError: (error) => {
      showSnackbar(error.response?.data?.message || 'Failed to delete product', 'error');
    },
  });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      short_description: product.short_description || '',
      redirection_url: product.redirection_url || '',
      sku: product.sku || '',
      stock_quantity: product.stock_quantity || '',
      category_id: product.category_id,
      specifications: product.specifications || [],
      features: product.features || [],
      is_featured: product.is_featured,
      is_active: product.is_active,
      image: null,
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingProduct(null);
    setValidationErrors({});
    setFormData({
      name: '',
      description: '',
      short_description: '',
      redirection_url: '',
      sku: '',
      stock_quantity: '',
      category_id: '',
      specifications: [],
      features: [],
      is_featured: false,
      is_active: true,
      image: null,
    });
  };

  const handleSubmit = () => {
    setValidationErrors({});
    
    const submitData = new FormData();
    submitData.append('name', formData.name.trim());
    submitData.append('description', formData.description.trim());
    
    if (formData.short_description.trim()) {
      submitData.append('short_description', formData.short_description.trim());
    }
    
    if (formData.redirection_url) {
      submitData.append('redirection_url', formData.redirection_url);
    }
    
    if (formData.sku.trim()) {
      submitData.append('sku', formData.sku.trim());
    }
    
    if (formData.stock_quantity) {
      submitData.append('stock_quantity', formData.stock_quantity);
    }
    
    submitData.append('category_id', formData.category_id);
    submitData.append('is_featured', formData.is_featured ? '1' : '0');
    submitData.append('is_active', formData.is_active ? '1' : '0');
    
    if (formData.image) {
      submitData.append('image', formData.image);
    }

    if (editingProduct) {
      updateMutation.mutate({ id: editingProduct.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
      valueGetter: (params) => {
        return params.row?.category?.name || 'N/A';
      },
    },
    {
      field: 'image_path',
      headerName: 'Image',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {params.value ? (
            <img
              src={`/${params.value}`}
              alt="Product"
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
    {
      field: 'redirection_url',
      headerName: 'redirection_url',
      width: 100,
  valueFormatter: (params) => params?.value || 'N/A',
    },
    {
      field: 'stock_quantity',
      headerName: 'Stock',
      width: 100,
    },
    {
      field: 'is_featured',
      headerName: 'Featured',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Yes' : 'No'}
          color={params.value ? 'primary' : 'default'}
          size="small"
        />
      ),
    },
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
        <Typography variant="h4">Products</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Add Product
        </Button>
      </Box>

      {productsError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Failed to load products: {productsError.message}
        </Alert>
      )}

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={products || []}
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
          {editingProduct ? 'Edit Product' : 'Create New Product'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  margin="normal"
                  required
                  error={!!validationErrors.name}
                  helperText={validationErrors.name?.[0]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    error={!!validationErrors.category_id}
                    disabled={categoriesLoading}
                  >
                    {categories?.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {validationErrors.category_id && (
                    <Typography variant="caption" display="block" sx={{ mt: 1, color: 'error.main' }}>
                      {validationErrors.category_id[0]}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Short Description"
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  margin="normal"
                  error={!!validationErrors.short_description}
                  helperText={validationErrors.short_description?.[0]}
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
                  rows={4}
                  required
                  error={!!validationErrors.description}
                  helperText={validationErrors.description?.[0]}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="redirection_url"
                  value={formData.redirection_url}
                  onChange={(e) => setFormData({ ...formData, redirection_url: e.target.value })}
                  margin="normal"
                  type="text"
                  error={!!validationErrors.redirection_url}
                  helperText={validationErrors.redirection_url?.[0]}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="SKU"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  margin="normal"
                  error={!!validationErrors.sku}
                  helperText={validationErrors.sku?.[0]}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Stock Quantity"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                  margin="normal"
                  type="number"
                  error={!!validationErrors.stock_quantity}
                  helperText={validationErrors.stock_quantity?.[0]}
                />
              </Grid>
              <Grid item xs={12}>
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
                  {!editingProduct && (
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      Image is required for new products
                    </Typography>
                  )}
                  {validationErrors.image && (
                    <Typography variant="caption" display="block" sx={{ mt: 1, color: 'error.main' }}>
                      {validationErrors.image[0]}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      />
                    }
                    label="Featured"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      />
                    }
                    label="Active"
                  />
                </Box>
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

export default Products;

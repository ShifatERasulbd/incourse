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
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import { DataGrid } from '@mui/x-data-grid';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import blogService from '../services/blogService';

// MDEditor is React 19 compatible and doesn't need configuration

const Blogs = () => {
  const [open, setOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    published_date: new Date().toISOString().split('T')[0],
    author: 'Admin',
    tags: [],
    is_featured: false,
    is_published: true,
    image: null,
  });

  const queryClient = useQueryClient();

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
      handleClose();
      showSnackbar('Blog created successfully', 'success');
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
      showSnackbar(error.response?.data?.message || 'Failed to create blog', 'error');
    },
  });

  const updateMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
      handleClose();
      showSnackbar('Blog updated successfully', 'success');
    },
    onError: (error) => {
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
      }
      showSnackbar(error.response?.data?.message || 'Failed to update blog', 'error');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: blogService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['blogs']);
      showSnackbar('Blog deleted successfully', 'success');
    },
    onError: (error) => {
      showSnackbar(error.response?.data?.message || 'Failed to delete blog', 'error');
    },
  });

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCreate = () => {
    setEditingBlog(null);
    setOpen(true);
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      published_date: blog.published_date,
      author: blog.author || 'Admin',
      tags: blog.tags || [],
      is_featured: blog.is_featured,
      is_published: blog.is_published,
      image: null,
    });
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingBlog(null);
    setValidationErrors({});
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      published_date: new Date().toISOString().split('T')[0],
      author: 'Admin',
      tags: [],
      is_featured: false,
      is_published: true,
      image: null,
    });
  };

  const handleSubmit = () => {
    setValidationErrors({});
    
    const submitData = new FormData();
    submitData.append('title', formData.title.trim());
    submitData.append('excerpt', formData.excerpt.trim());
    submitData.append('content', formData.content.trim());
    submitData.append('published_date', formData.published_date);
    submitData.append('author', formData.author.trim());
    submitData.append('is_featured', formData.is_featured ? '1' : '0');
    submitData.append('is_published', formData.is_published ? '1' : '0');
    
    if (formData.image) {
      submitData.append('image', formData.image);
    }

    if (editingBlog) {
      updateMutation.mutate({ id: editingBlog.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 250 },
    {
      field: 'image_path',
      headerName: 'Image',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {params.value ? (
            <img
              src={`/${params.value}`}
              alt="Blog"
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
    { field: 'author', headerName: 'Author', width: 120 },
    { field: 'published_date', headerName: 'Published', width: 120 },
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
      field: 'is_published',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Published' : 'Draft'}
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
        <Typography variant="h4">Blog Posts</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Add Blog Post
        </Button>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={blogs || []}
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
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
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
                  label="Excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  margin="normal"
                  multiline
                  rows={2}
                  required
                  error={!!validationErrors.excerpt}
                  helperText={validationErrors.excerpt?.[0]}
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Content *
                  </Typography>
                  <MDEditor
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content: content || '' })}
                    height={400}
                    data-color-mode="light"
                  />
                  {validationErrors.content && (
                    <Typography variant="caption" display="block" sx={{ mt: 1, color: 'error.main' }}>
                      {validationErrors.content[0]}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Author"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  margin="normal"
                  error={!!validationErrors.author}
                  helperText={validationErrors.author?.[0]}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Published Date"
                  value={formData.published_date}
                  onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                  margin="normal"
                  type="date"
                  required
                  error={!!validationErrors.published_date}
                  helperText={validationErrors.published_date?.[0]}
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
                  {!editingBlog && (
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      Image is required for new blog posts
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
                        checked={formData.is_published}
                        onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                      />
                    }
                    label="Published"
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

export default Blogs;

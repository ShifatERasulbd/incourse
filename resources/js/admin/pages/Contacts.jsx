import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Switch,
  Snackbar,
  Alert,
  Grid,
  Avatar,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
  ContactMail as ContactIcon,
} from '@mui/icons-material';
import contactService from '../services/contactService';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    working_hours: '',
    banner_image: null,
    map_url: '',
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
    instagram_url: '',
    is_active: false,
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactService.getAll();
      setContacts(response.data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      showSnackbar('Error fetching contacts', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCreate = () => {
    setEditingContact(null);
    setFormData({
      title: '',
      description: '',
      address: '',
      phone: '',
      email: '',
      working_hours: '',
      banner_image: null,
      map_url: '',
      facebook_url: '',
      twitter_url: '',
      linkedin_url: '',
      instagram_url: '',
      is_active: false,
    });
    setOpen(true);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setFormData({
      title: contact.title,
      description: contact.description || '',
      address: contact.address,
      phone: contact.phone,
      email: contact.email,
      working_hours: contact.working_hours,
      banner_image: null,
      map_url: contact.map_url || '',
      facebook_url: contact.facebook_url || '',
      twitter_url: contact.twitter_url || '',
      linkedin_url: contact.linkedin_url || '',
      instagram_url: contact.instagram_url || '',
      is_active: contact.is_active,
    });
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.delete(id);
        showSnackbar('Contact deleted successfully', 'success');
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
        showSnackbar('Error deleting contact', 'error');
      }
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await contactService.toggleActive(id);
      showSnackbar('Contact status updated successfully', 'success');
      fetchContacts();
    } catch (error) {
      console.error('Error toggling contact status:', error);
      showSnackbar('Error updating contact status', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submitData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key] !== null && formData[key] !== '') {
        submitData.append(key, formData[key]);
      }
    });

    try {
      if (editingContact) {
        await contactService.update(editingContact.id, submitData);
        showSnackbar('Contact updated successfully', 'success');
      } else {
        await contactService.create(submitData);
        showSnackbar('Contact created successfully', 'success');
      }
      setOpen(false);
      fetchContacts();
    } catch (error) {
      console.error('Error saving contact:', error);
      showSnackbar('Error saving contact', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading contacts...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Contact Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          sx={{ backgroundColor: '#c41c13', '&:hover': { backgroundColor: '#a01610' } }}
        >
          Add Contact
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ mr: 2, bgcolor: '#c41c13' }}>
                      <ContactIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">{contact.title}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {contact.working_hours}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.phone}</TableCell>
                <TableCell>
                  <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                    {contact.address}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={contact.is_active ? 'Active' : 'Inactive'}
                    color={contact.is_active ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleToggleActive(contact.id)}
                    color={contact.is_active ? 'success' : 'default'}
                    title={contact.is_active ? 'Deactivate' : 'Activate'}
                  >
                    {contact.is_active ? <ToggleOnIcon /> : <ToggleOffIcon />}
                  </IconButton>
                  <IconButton onClick={() => handleEdit(contact)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(contact.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Contact Form Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            minHeight: '80vh',
            maxHeight: '90vh'
          }
        }}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {editingContact ? 'Edit Contact' : 'Add New Contact'}
          </DialogTitle>
          <DialogContent sx={{ minHeight: '600px' }}>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {/* Basic Information Section */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: '#c41c13' }}>
                  Basic Information
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  name="title"
                  label="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="phone"
                  label="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="working_hours"
                  label="Working Hours"
                  value={formData.working_hours}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  label="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  multiline
                  rows={2}
                />
              </Grid>

              {/* Description Section - Full Width */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, mt: 2, color: '#c41c13' }}>
                  Description
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  '& .ql-container': {
                    minHeight: '200px',
                    fontSize: '14px'
                  },
                  '& .ql-toolbar': {
                    borderBottom: '1px solid #ddd'
                  }
                }}>
                  <ReactQuill
                    theme="snow"
                    value={formData.description}
                    onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                    style={{
                      height: '200px',
                      marginBottom: '42px'
                    }}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'color': [] }, { 'background': [] }],
                        ['link'],
                        ['clean']
                      ],
                    }}
                    formats={[
                      'header', 'bold', 'italic', 'underline', 'strike',
                      'list', 'bullet', 'color', 'background', 'link'
                    ]}
                    placeholder="Enter a detailed description of your contact information..."
                  />
                </Box>
              </Grid>

              {/* Media Section */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, mt: 3, color: '#c41c13' }}>
                  Media & Links
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="banner-image-upload"
                  type="file"
                  name="banner_image"
                  onChange={handleInputChange}
                />
                <label htmlFor="banner-image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{
                      height: '56px',
                      borderColor: '#c41c13',
                      color: '#c41c13',
                      '&:hover': {
                        borderColor: '#a01610',
                        backgroundColor: 'rgba(196, 28, 19, 0.04)'
                      }
                    }}
                  >
                    📷 Upload Banner Image
                  </Button>
                </label>
                {formData.banner_image && (
                  <Typography variant="caption" display="block" sx={{ mt: 1, color: 'green' }}>
                    ✅ Selected: {formData.banner_image.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="map_url"
                  label="Google Maps Embed URL"
                  value={formData.map_url}
                  onChange={handleInputChange}
                  fullWidth
                  placeholder="https://maps.google.com/embed?pb=..."
                />
              </Grid>

              {/* Social Media Section */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, mt: 2, color: '#c41c13' }}>
                  Social Media Links
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="facebook_url"
                  label="Facebook URL"
                  value={formData.facebook_url}
                  onChange={handleInputChange}
                  fullWidth
                  placeholder="https://facebook.com/yourpage"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="twitter_url"
                  label="Twitter URL"
                  value={formData.twitter_url}
                  onChange={handleInputChange}
                  fullWidth
                  placeholder="https://twitter.com/yourhandle"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="linkedin_url"
                  label="LinkedIn URL"
                  value={formData.linkedin_url}
                  onChange={handleInputChange}
                  fullWidth
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="instagram_url"
                  label="Instagram URL"
                  value={formData.instagram_url}
                  onChange={handleInputChange}
                  fullWidth
                  placeholder="https://instagram.com/yourhandle"
                />
              </Grid>

              {/* Status Section */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, mt: 2, color: '#c41c13' }}>
                  Status
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{
                  p: 2,
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  backgroundColor: formData.is_active ? '#e8f5e8' : '#fff3e0'
                }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formData.is_active}
                        onChange={handleInputChange}
                        name="is_active"
                        sx={{
                          '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#c41c13',
                          },
                          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#c41c13',
                          },
                        }}
                      />
                    }
                    label={
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          {formData.is_active ? 'Active Contact Information' : 'Inactive Contact Information'}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {formData.is_active
                            ? 'This contact information will be displayed on the website'
                            : 'This contact information will not be displayed on the website'
                          }
                        </Typography>
                      </Box>
                    }
                  />
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#c41c13' }}>
              {editingContact ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contacts;

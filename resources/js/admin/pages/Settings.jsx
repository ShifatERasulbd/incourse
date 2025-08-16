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
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  ToggleOff as ToggleOffIcon,
  ToggleOn as ToggleOnIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import settingService from '../services/settingService';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Settings() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [tabValue, setTabValue] = useState(0);
  const [formData, setFormData] = useState({
    key: '',
    value: '',
    type: 'text',
    group: 'general',
    label: '',
    description: '',
    sort_order: 0,
    is_active: true
  });

  const settingGroups = [
    { value: 'general', label: 'General' },
    { value: 'contact', label: 'Contact' },
    { value: 'social', label: 'Social Media' },
    { value: 'seo', label: 'SEO' },
    { value: 'email', label: 'Email' },
  ];

  const settingTypes = [
    { value: 'text', label: 'Text' },
    { value: 'textarea', label: 'Textarea' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean' },
    { value: 'image', label: 'Image' },
    { value: 'json', label: 'JSON' },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
     

      // Use the settings service (with built-in fallback)
      const response = await settingService.getAllSettings();

      if (response && response.success && Array.isArray(response.data)) {
        setSettings(response.data);
        setSnackbar({
          open: true,
          message: response.message || 'Settings loaded successfully!',
          severity: 'success'
        });
      } else {
        setSnackbar({
          open: true,
          message: response?.message || 'Failed to fetch settings - Invalid response format',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      console.error('Error details:', error.response?.data);
      setSnackbar({
        open: true,
        message: `Error fetching settings: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editMode) {
        response = await settingService.updateSetting(selectedSetting.id, formData);
      } else {
        response = await settingService.createSetting(formData);
      }

      if (response.success) {
        setSnackbar({
          open: true,
          message: editMode ? 'Setting updated successfully!' : 'Setting created successfully!',
          severity: 'success'
        });
        fetchSettings();
        handleClose();
      }
    } catch (error) {
      console.error('Error saving setting:', error);
      setSnackbar({
        open: true,
        message: 'Error saving setting',
        severity: 'error'
      });
    }
  };

  const handleEdit = (setting) => {
    setSelectedSetting(setting);
    setFormData({
      key: setting.key,
      value: setting.value,
      type: setting.type,
      group: setting.group,
      label: setting.label,
      description: setting.description || '',
      sort_order: setting.sort_order,
      is_active: setting.is_active
    });
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this setting?')) {
      try {
        const response = await settingService.deleteSetting(id);
        if (response.success) {
          setSnackbar({
            open: true,
            message: 'Setting deleted successfully!',
            severity: 'success'
          });
          fetchSettings();
        }
      } catch (error) {
        console.error('Error deleting setting:', error);
        setSnackbar({
          open: true,
          message: 'Error deleting setting',
          severity: 'error'
        });
      }
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const response = await settingService.toggleSettingActive(id);
      if (response.success) {
        setSnackbar({
          open: true,
          message: 'Setting status updated successfully!',
          severity: 'success'
        });
        fetchSettings();
      }
    } catch (error) {
      console.error('Error toggling setting status:', error);
      setSnackbar({
        open: true,
        message: 'Error updating setting status',
        severity: 'error'
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setSelectedSetting(null);
    setFormData({
      key: '',
      value: '',
      type: 'text',
      group: 'general',
      label: '',
      description: '',
      sort_order: 0,
      is_active: true
    });
  };

  const getSettingsByGroup = (group) => {
    return settings.filter(setting => setting.group === group);
  };

  const renderSettingValue = (setting) => {
    switch (setting.type) {
      case 'boolean':
        return setting.value === 'true' ? 'Yes' : 'No';
      case 'textarea':
        return setting.value.length > 50 ? setting.value.substring(0, 50) + '...' : setting.value;
      case 'image':
        return setting.value ? (
          <img 
            src={`/${setting.value}`} 
            alt={setting.label}
            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
          />
        ) : 'No image';
      default:
        return setting.value.length > 50 ? setting.value.substring(0, 50) + '...' : setting.value;
    }
  };

  const renderValueInput = () => {
    switch (formData.type) {
      case 'textarea':
        return (
          <ReactQuill
            theme="snow"
            value={formData.value}
            onChange={(value) => setFormData(prev => ({ ...prev, value }))}
            style={{ height: '200px', marginBottom: '42px' }}
          />
        );
      case 'boolean':
        return (
          <FormControl fullWidth>
            <InputLabel>Value</InputLabel>
            <Select
              name="value"
              value={formData.value}
              onChange={handleInputChange}
              label="Value"
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
          </FormControl>
        );
      case 'number':
        return (
          <TextField
            name="value"
            label="Value"
            type="number"
            value={formData.value}
            onChange={handleInputChange}
            fullWidth
            required
          />
        );
      case 'image':
        return (
          <TextField
            name="value"
            label="Image Path"
            value={formData.value}
            onChange={handleInputChange}
            fullWidth
            placeholder="e.g., Frontend/images/logo.png"
            helperText="Enter the relative path to the image file"
          />
        );
      default:
        return (
          <TextField
            name="value"
            label="Value"
            value={formData.value}
            onChange={handleInputChange}
            fullWidth
            required
          />
        );
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading settings...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          <SettingsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Settings Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ mb: 2 }}
        >
          Add Setting
        </Button>
      </Box>

      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="settings tabs">
          {settingGroups.map((group, index) => (
            <Tab key={group.value} label={group.label} />
          ))}
        </Tabs>

        {settingGroups.map((group, index) => (
          <TabPanel key={group.value} value={tabValue} index={index}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Key</TableCell>
                    <TableCell>Label</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSettingsByGroup(group.value).map((setting) => (
                    <TableRow key={setting.id}>
                      <TableCell>
                        <Typography variant="body2" fontFamily="monospace">
                          {setting.key}
                        </Typography>
                      </TableCell>
                      <TableCell>{setting.label}</TableCell>
                      <TableCell>{renderSettingValue(setting)}</TableCell>
                      <TableCell>
                        <Chip
                          label={setting.type}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={setting.is_active ? 'Active' : 'Inactive'}
                          color={setting.is_active ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(setting)}
                          color="primary"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleToggleActive(setting.id)}
                          color={setting.is_active ? 'warning' : 'success'}
                        >
                          {setting.is_active ? <ToggleOffIcon /> : <ToggleOnIcon />}
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(setting.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {getSettingsByGroup(group.value).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Typography variant="body2" color="text.secondary">
                          No settings found for {group.label}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        ))}
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editMode ? 'Edit Setting' : 'Add New Setting'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="key"
                  label="Key"
                  value={formData.key}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  disabled={editMode}
                  helperText="Unique identifier for the setting"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="label"
                  label="Label"
                  value={formData.label}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    label="Type"
                  >
                    {settingTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Group</InputLabel>
                  <Select
                    name="group"
                    value={formData.group}
                    onChange={handleInputChange}
                    label="Group"
                  >
                    {settingGroups.map((group) => (
                      <MenuItem key={group.value} value={group.value}>
                        {group.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                {renderValueInput()}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={2}
                  helperText="Optional description for this setting"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="sort_order"
                  label="Sort Order"
                  type="number"
                  value={formData.sort_order}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      name="is_active"
                    />
                  }
                  label="Active"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} startIcon={<CancelIcon />}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              {editMode ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
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
}

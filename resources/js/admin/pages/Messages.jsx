import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Snackbar, Alert, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [viewMessage, setViewMessage] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
  const res = await axios.get('/incourse/api/messages');
      setMessages(res.data.data || []);
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to fetch messages', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
  await axios.delete(`/incourse/api/messages/${id}`);
      setSnackbar({ open: true, message: 'Message deleted', severity: 'success' });
      setMessages(messages.filter((m) => m.id !== id));
    } catch {
      setSnackbar({ open: true, message: 'Failed to delete message', severity: 'error' });
    }
  };

  return (
    <Box>
      <Typography variant="h4" mb={2}>Messages</Typography>
      {loading ? <CircularProgress /> : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {messages.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell>{msg.name}</TableCell>
                  <TableCell>{msg.email}</TableCell>
                  <TableCell>{msg.subject}</TableCell>
                  <TableCell>{msg.message.length > 50 ? msg.message.slice(0, 50) + '...' : msg.message}</TableCell>
                  <TableCell>{new Date(msg.created_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => setViewMessage(msg)}><VisibilityIcon /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(msg.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* View Message Dialog */}
      {viewMessage && (
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6">Message from {viewMessage.name}</Typography>
          <Typography>Email: {viewMessage.email}</Typography>
          <Typography>Subject: {viewMessage.subject}</Typography>
          <Typography>Message:</Typography>
          <Typography sx={{ whiteSpace: 'pre-line', mb: 2 }}>{viewMessage.message}</Typography>
          <Button variant="contained" onClick={() => setViewMessage(null)}>Close</Button>
        </Paper>
      )}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Messages;

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

const Settings = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Application Settings
          </Typography>
          
          <List>
            <ListItem>
              <ListItemText
                primary="Site Name"
                secondary="InCourses"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Admin Email"
                secondary="admin@incourses.com"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Version"
                secondary="1.0.0"
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Environment"
                secondary="Production"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>

      <Box mt={3}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Information
            </Typography>
            
            <List>
              <ListItem>
                <ListItemText
                  primary="PHP Version"
                  secondary="8.2"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Laravel Version"
                  secondary="11.x"
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="React Version"
                  secondary="19.1.1"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Settings;

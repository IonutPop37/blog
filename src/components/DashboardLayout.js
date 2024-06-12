import { useRouter } from 'next/router';
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Box, CssBaseline } from '@mui/material';

const drawerWidth = 240;

const DashboardLayout = ({ children }) => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Blog Personal
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => handleNavigation('/articles/new')}>
            <ListItemText primary="Adauga articol" />
          </ListItem>
          <ListItem button onClick={() => handleNavigation('/articles/list')}>
            <ListItemText primary="Toate articolele" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;

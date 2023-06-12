import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  ListItemButton,
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { sideMenuData } from '@/data';

export const SideMenu = () => {
  const { general, adminPanel } = sideMenuData;

  return (
    <Drawer
      open={false}
      anchor='right'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
      <Box sx={{ width: 250, paddingTop: 5 }}>
        <List>
          <ListItem>
            <Input
              type='text'
              placeholder='Buscar...'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton aria-label='toggle password visibility'>
                    <SearchOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          </ListItem>

          {general.map(({ title, IconComponent, sxOptions }) => (
            <ListItemButton key={title} sx={sxOptions && sxOptions}>
              <ListItemIcon>
                <IconComponent />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          ))}

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          {adminPanel.map(({ title, IconComponent }) => (
            <ListItemButton key={title}>
              <ListItemIcon>
                <IconComponent />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

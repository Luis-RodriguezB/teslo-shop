import { useContext } from 'react';
import { useRouter } from 'next/router';
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
import { UiContext } from '@/context';
import { sideMenuData } from '@/data';

export const SideMenu = () => {
  const route = useRouter();
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const { general, adminPanel } = sideMenuData;

  const navigateTo = (url: string) => {
    route.push(url);
  };

  return (
    <Drawer
      open={isMenuOpen}
      onClose={toggleSideMenu}
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

          {general.map(({ title, IconComponent, sxOptions, url }) => (
            <ListItemButton
              key={title}
              sx={sxOptions && sxOptions}
              onClick={() => navigateTo(url)}
            >
              <ListItemIcon>
                <IconComponent />
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          ))}

          {/* Admin */}
          <Divider />
          <ListSubheader>Admin Panel</ListSubheader>

          {adminPanel.map(({ title, IconComponent, url }) => (
            <ListItemButton key={title} onClick={() => navigateTo(url)}>
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

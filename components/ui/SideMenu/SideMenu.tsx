import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Drawer,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
} from '@mui/material';
import { PublicMenuOption } from './PublicMenuOption';
import { PrivateMenuOption } from './PrivateMenuOption';
import { SearchOutlined } from '@mui/icons-material';
import { UiContext } from '@/context';


export const SideMenu = () => {
  const route = useRouter();
  const { isMenuOpen, toggleSideMenu } = useContext(UiContext);
  const [searchTerm, setSearchTerm] = useState('');

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    toggleSideMenu();
    route.replace(`/search/${searchTerm}`);
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
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && onSearchTerm()}
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

          <PublicMenuOption />

          <PrivateMenuOption />
        </List>
      </Box>
    </Drawer>
  );
};

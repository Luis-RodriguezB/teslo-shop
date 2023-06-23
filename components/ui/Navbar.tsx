import { useContext, useState } from 'react';
import NextLink from 'next/link';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from '@mui/icons-material';
import { useRouter } from 'next/router';
import { CartContext, UiContext } from '@/context';

export const Navbar = () => {
  const router = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const { numberOfItems } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    router.replace(`/search/${searchTerm}`);
    onToggleSearchVisible();
  };

  const isActiveLink = (route: string) => {
    return router.asPath === route ? 'primary' : 'info';
  };

  const onToggleSearchVisible = () => {
    setIsSearchVisible(!isSearchVisible);
    setSearchTerm('');
  };

  return (
    <AppBar>
      <Toolbar>
        <Box
          display='flex'
          justifyContent='start'
          sx={{
            width: '100%',
            maxWidth: {
              sm: 'calc(100% / 2)',
              lg: 'calc(calc(100% - 300px) / 2)',
            },
          }}
        >
          <NextLink href='/'>
            <Link
              display='flex'
              alignItems='center'
              justifyContent='center'
              underline='none'
              component='span'
            >
              <Typography variant='h5'>Teslo |</Typography>
              <Typography sx={{ ml: 0.5 }}>Shop</Typography>
            </Link>
          </NextLink>
        </Box>

        <Box
          justifyContent='center'
          alignItems='center'
          sx={{
            display: isSearchVisible
              ? { xs: 'none', lg: 'flex' }
              : { xs: 'none', sm: 'flex' },
            maxWidth: '300px',
            width: '100%',
          }}
          className="fadeIn"
        >
          <NextLink href='/category/men' className='navLink'>
            <Link component='span'>
              <Button color={isActiveLink('/category/men')}>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women' className='navLink'>
            <Link component='span'>
              <Button color={isActiveLink('/category/women')}>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kids' className='navLink'>
            <Link component='span'>
              <Button color={isActiveLink('/category/kids')}>Niños</Button>
            </Link>
          </NextLink>
        </Box>

        <Box
          display='flex'
          justifyContent='end'
          sx={{
            width: '100%',
            maxWidth: {
              sm: 'calc(100% / 2)',
              lg: 'calc(calc(100% - 300px) / 2)',
            },
          }}
        >
          {isSearchVisible ? (
            <Input
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && onSearchTerm()}
              type='text'
              placeholder='Buscar...'
              className='fadeIn'
              sx={{ display: { xs: 'none', sm: 'flex' } }}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={onToggleSearchVisible}>
                    <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <IconButton
              sx={{ display: { xs: 'none', sm: 'flex' } }}
              className='fadeIn'
              onClick={onToggleSearchVisible}
            >
              <SearchOutlined />
            </IconButton>
          )}

          {/** Pantallas pequeñas */}
          <IconButton
            sx={{ display: { xs: 'flex', sm: 'none' } }}
            onClick={toggleSideMenu}
          >
            <SearchOutlined />
          </IconButton>

          <NextLink href='/cart'>
            <IconButton>
              <Badge badgeContent={numberOfItems > 9 ? '+9' : numberOfItems} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </NextLink>

          <Button onClick={toggleSideMenu}>Menú</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

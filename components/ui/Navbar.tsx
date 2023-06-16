import { useContext } from 'react';
import NextLink from 'next/link';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { UiContext } from '@/context';

export const Navbar = () => {
  const { asPath } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);

  const isActiveLink = (route: string) => {
    return asPath === route ? 'primary' : 'info';
  };

  return (
    <AppBar>
      <Toolbar>
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

        <Box flex={1} />

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
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

        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href='/cart'>
          <IconButton>
            <Badge badgeContent={2} color='secondary'>
              <ShoppingCartOutlined />
            </Badge>
          </IconButton>
        </NextLink>

        <Button onClick={toggleSideMenu} >Menú</Button>
      </Toolbar>
    </AppBar>
  );
};

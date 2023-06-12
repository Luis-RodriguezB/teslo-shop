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

export const Navbar = () => {
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
          <NextLink href='/category/men'>
            <Link component='span'>
              <Button>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women'>
            <Link component='span'>
              <Button>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink href='/category/kids'>
            <Link component='span'>
              <Button>Niños</Button>
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

        <Button>Menú</Button>
      </Toolbar>
    </AppBar>
  );
};

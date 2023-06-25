import { FC, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  AccountCircleOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AuthContext, UiContext } from '@/context';

export const PublicMenuOption = () => {
  const router = useRouter();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { toggleSideMenu } = useContext(UiContext);

  const navigateTo = (url: string) => {
    router.push(url);

    toggleSideMenu();
  };

  const onLogout = () => {
    logout();
  };

  return (
    <>
      {isLoggedIn && (
        <>
          <ListItemButton>
            <ListItemIcon>
              <AccountCircleOutlined />
            </ListItemIcon>
            <ListItemText primary='Perfil' />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <ConfirmationNumberOutlined />
            </ListItemIcon>
            <ListItemText primary='Mis Ordernes' />
          </ListItemButton>
        </>
      )}

      <ListItemButton
        sx={{ display: { xs: '', sm: 'none' } }}
        onClick={() => navigateTo('/category/men')}
      >
        <ListItemIcon>
          <MaleOutlined />
        </ListItemIcon>
        <ListItemText primary='Hombres' />
      </ListItemButton>

      <ListItemButton
        sx={{ display: { xs: '', sm: 'none' } }}
        onClick={() => navigateTo('/category/women')}
      >
        <ListItemIcon>
          <FemaleOutlined />
        </ListItemIcon>
        <ListItemText primary='Mujeres' />
      </ListItemButton>

      <ListItemButton
        sx={{ display: { xs: '', sm: 'none' } }}
        onClick={() => navigateTo('/category/kid')}
      >
        <ListItemIcon>
          <EscalatorWarningOutlined />
        </ListItemIcon>
        <ListItemText primary='Niños' />
      </ListItemButton>

      {isLoggedIn ? (
        <ListItemButton onClick={onLogout}>
          <ListItemIcon>
            <LoginOutlined />
          </ListItemIcon>
          <ListItemText primary='Salir' />
        </ListItemButton>
      ) : (
        <ListItemButton
          onClick={() =>
            navigateTo(
              router.asPath !== '/'
                ? `/auth/login?p=${router.asPath}`
                : '/auth/login'
            )
          }
        >
          <ListItemIcon>
            <VpnKeyOutlined />
          </ListItemIcon>
          <ListItemText primary='Ingresar' />
        </ListItemButton>
      )}
    </>
  );
};

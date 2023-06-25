import { useContext } from 'react';
import { useRouter } from 'next/router';
import {
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
} from '@mui/icons-material';
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { AuthContext, UiContext } from '@/context';
import { User_Role } from '@/interfaces';

export const PrivateMenuOption = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { toggleSideMenu } = useContext(UiContext);

  const navigateTo = (url: string) => {
    router.push(url);

    toggleSideMenu();
  };

  return (
    user?.role === User_Role.USER_ADMIN && (
      <>
        <Divider />
        <ListSubheader>Admin Panel</ListSubheader>

        <ListItemButton>
          <ListItemIcon>
            <CategoryOutlined />
          </ListItemIcon>
          <ListItemText primary='Productos' />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <ConfirmationNumberOutlined />
          </ListItemIcon>
          <ListItemText primary='Ordenes' />
        </ListItemButton>

        <ListItemButton>
          <ListItemIcon>
            <AdminPanelSettings />
          </ListItemIcon>
          <ListItemText primary='Usuarios' />
        </ListItemButton>
      </>
    )
  );
};

import {
  AccountCircleOutlined,
  AdminPanelSettings,
  CategoryOutlined,
  ConfirmationNumberOutlined,
  EscalatorWarningOutlined,
  FemaleOutlined,
  LoginOutlined,
  MaleOutlined,
  VpnKeyOutlined,
} from '@mui/icons-material';
import { SvgIconTypeMap, SxProps, Theme } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface General {
  title: string;
  IconComponent: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  sxOptions?: SxProps<Theme>;
  url: string;
}

interface SideMenuData {
  general: General[];
  adminPanel: General[];
}

export const sideMenuData: SideMenuData = {
  general: [
    {
      title: 'Perfil',
      IconComponent: AccountCircleOutlined,
      url: '/'
    },
    {
      title: 'Mis Ordenes',
      IconComponent: ConfirmationNumberOutlined,
      url: '/'
    },
    {
      title: 'Hombres',
      IconComponent: MaleOutlined,
      sxOptions: {
        display: { xs: '', sm: 'none' }
      },
      url: '/category/men'
    },
    {
      title: 'Mujeres',
      IconComponent: FemaleOutlined,
      sxOptions: {
        display: { xs: '', sm: 'none' }
      },
      url: '/category/women'
    },
    {
      title: 'Niños',
      IconComponent: EscalatorWarningOutlined,
      sxOptions: {
        display: { xs: '', sm: 'none' }
      },
      url: '/category/kids'
    },
    {
      title: 'Ingresar',
      IconComponent: VpnKeyOutlined,
      url: '/auth/login'
    },
    {
      title: 'Salir',
      IconComponent: LoginOutlined,
      url: '/'
    },
  ],
  adminPanel: [
    {
      title: 'Productos',
      IconComponent: CategoryOutlined,
      url: '/products'
    },
    {
      title: 'Ordenes',
      IconComponent: ConfirmationNumberOutlined,
      url: '/orders/history'
    },
    {
      title: 'Usuarios',
      IconComponent: AdminPanelSettings,
      url: ''
    },
  ],
};

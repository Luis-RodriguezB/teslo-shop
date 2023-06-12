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
    },
    {
      title: 'Mis Ordenes',
      IconComponent: ConfirmationNumberOutlined,
    },
    {
      title: 'Hombres',
      IconComponent: MaleOutlined,
      sxOptions: {
        display: { xs: '', sm: 'none' }
      }
    },
    {
      title: 'Mujeres',
      IconComponent: FemaleOutlined,
      sxOptions: {
        display: { xs: '', sm: 'none' }
      }
    },
    {
      title: 'Niños',
      IconComponent: EscalatorWarningOutlined,
      sxOptions: {
        display: { xs: '', sm: 'none' }
      }
    },
    {
      title: 'Ingresar',
      IconComponent: VpnKeyOutlined,
    },
    {
      title: 'Salir',
      IconComponent: LoginOutlined,
    },
  ],
  adminPanel: [
    {
      title: 'Productos',
      IconComponent: CategoryOutlined,
    },
    {
      title: 'Ordenes',
      IconComponent: ConfirmationNumberOutlined,
    },
    {
      title: 'Usuarios',
      IconComponent: AdminPanelSettings,
    },
  ],
};

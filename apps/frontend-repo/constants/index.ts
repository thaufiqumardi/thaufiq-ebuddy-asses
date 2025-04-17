import { IMenuItem } from '@/types';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

export const MENU_LIST: IMenuItem[] = [
  {
    label: "Dashboard",
    Icon: DashboardIcon,
    path: "/home",

  },
  {
    label: "Users",
    Icon: PeopleIcon,
    path: "/users",
  }
]
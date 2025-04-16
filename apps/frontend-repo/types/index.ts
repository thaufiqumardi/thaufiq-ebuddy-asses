import type { SvgIconTypeMap } from '@mui/material';
import type { OverridableComponent } from '@mui/material/OverridableComponent';

export interface IMenuItem {
  path?: string;
  label: string;
  Icon: OverridableComponent<SvgIconTypeMap>;
};
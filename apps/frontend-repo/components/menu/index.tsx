'use client'
import React from 'react';
import { List, Grid, ListItemButton } from '@mui/material';

import { IMenuItem } from '@/types';

import Link from 'next/link'
import { ListItemIcon, ListItemText } from '@mui/material';
import { usePathname } from 'next/navigation';


type Props = IMenuItem & {
  selected?: boolean;
  onClick?: () => void;
};

export const MenuItem: React.FC<Props> = ({
  path,
  label,
  Icon,
  selected,
  onClick,
}) => {
  const link = (
    <ListItemButton
      selected={selected}
      sx={{
        '&.Mui-selected': {
          backgroundColor: 'primary.dark',
          color: 'common.white',
        },
        '&:hover': {
          backgroundColor: 'primary.light',
          color: 'common.white',
        },
      }}
      onClick={onClick}
    >
      <ListItemIcon
        sx={[
          { minWidth: 'auto' },
          (theme) => ({
            paddingRight: theme.spacing(2),
          }),
        ]}
      >
        <Icon sx={{ color: 'secondary.dark' }} />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );

  return path
    ? <Link href={path}>{link}</Link>
    : link;
};

export const MenuItemsList = ({ items = [] }: { items?: IMenuItem[] }) => {
  const pathname = usePathname();

  if (!items.length) return null;

  return (
    <Grid>
      <List sx={{ p: 0 }}>
        {items.map(({ label, path, Icon }) => (
          <MenuItem
            Icon={Icon}
            label={label}
            path={path}
            key={path}
            selected={pathname === path}
          />
        ))}
      </List>
    </Grid>
  );
};
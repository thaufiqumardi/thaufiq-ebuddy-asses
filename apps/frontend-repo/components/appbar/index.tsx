'use client';
import React from 'react';
import { AppBar as AppBarMui, Toolbar, IconButton, Typography, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

import { useDrawerContext } from '@contexts/drawer-context';

export function Header() {
  const { isOpened, toggleIsOpened } = useDrawerContext();
  const theme = useTheme();
  return (
    <AppBarMui
      sx={{ backgroundColor: 'primary.dark', color: 'secondary.contrastText' }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => toggleIsOpened(!isOpened)}
          sx={{ padding: theme.spacing(1) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ margin: 'auto' }}>
          Header
        </Typography>
      </Toolbar>
    </AppBarMui>
  );
};

'use client';
import React from 'react';
import { AppBar as AppBarMui, Toolbar, IconButton, Typography, useTheme } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { toggleDrawer } from '@/store/drawerSlice';
import { AppDispatch, RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';

export function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen } = useSelector((state: RootState) => state.drawer);
  const theme = useTheme();
  return (
    <AppBarMui
      sx={{ backgroundColor: 'primary.dark', color: 'secondary.contrastText' }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={() => dispatch(toggleDrawer(!isOpen))}
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

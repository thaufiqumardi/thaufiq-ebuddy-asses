'use client';
import React from 'react';
import { useMediaQuery, useTheme, Drawer as MuiDrawer, styled } from '@mui/material';
import { MenuItemsList } from '@component';
import { toggleDrawer } from '@/store/drawerSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { MENU_LIST } from '@/constants';

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'isOpened',
})<{ isOpened: boolean }>(({ isOpened, theme }) => ({
  width: isOpened ? 240 : theme.spacing(7),
  height: '100%',
  overflow: 'auto',
  transition: isOpened
    ? theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      })
    : theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
  '& .MuiDrawer-paper': {
    background: '#D8DCD6',
    position: 'static',
    overflowX: 'hidden'
  },
}));

export const Drawer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen } = useSelector((state: RootState) => state.drawer);
  const theme = useTheme();
  const menu = MENU_LIST;
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <StyledDrawer
      variant={isLargeScreen ? 'permanent' : 'temporary'}
      open={!isLargeScreen && isOpen ? true : false}
      onClose={() => dispatch(toggleDrawer(!isOpen))}
      isOpened={isOpen}
    >
      <MenuItemsList items={menu}/>
    </StyledDrawer>
  );
};
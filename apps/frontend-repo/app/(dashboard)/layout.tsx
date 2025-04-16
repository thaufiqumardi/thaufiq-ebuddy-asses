'use client';
import { ReactNode } from "react";
import { Toolbar, Box, styled } from "@mui/material";

import { Header, Drawer} from "@component";
import { DrawerContextProvider } from "@/contexts/drawer-context";

const OuterContainer = styled(Box)`
  display: flex;
  overflow: hidden;
  height: inherit;
  flex-direction: column;
  min-height: 100vh;
`;

const InnerContainer = styled(Box)`
  display: flex;
  flex: 1;
  overflow: hidden;
  height: inherit;
`;


export default function DashboardLayout({ children }: { children: Readonly<ReactNode> }) {
  return (
    <DrawerContextProvider>
      <OuterContainer>
        <Header />
        <Toolbar />
        <InnerContainer>
          <Drawer />
          {children}
        </InnerContainer>
      </OuterContainer>
    </DrawerContextProvider>
  )
};  

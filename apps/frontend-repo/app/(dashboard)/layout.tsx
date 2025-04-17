import { ReactNode } from "react";
import { Toolbar, Box } from "@mui/material";
import { Header, Drawer } from "@/components";

export default function DashboardLayout({ children }: { children: Readonly<ReactNode> }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: 'inherit',  
      minHeight: '100vh', 
      overflow: 'auto' 
    }}>
      <Header />
      <Toolbar />
      <Box sx={{ 
        display: 'flex', 
        overflow: 'hidden', 
        height: 'inherit', 
        flex: 1,
      }}>
        <Drawer />
        {children}
      </Box>
    </Box>
  )
};  

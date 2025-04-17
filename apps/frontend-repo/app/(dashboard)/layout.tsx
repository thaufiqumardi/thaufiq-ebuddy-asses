import { ReactNode } from "react";
import { Toolbar, Box } from "@mui/material";
import { Header, Drawer } from "@/components";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function  DashboardLayout({ children }: { children: Readonly<ReactNode> }) {
  const cookiesStore = await cookies();
  const token =  cookiesStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }
  
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

import LoginForm from "@/components/login/login-form";
import { Box } from "@mui/material";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
    const cookiesStore = await cookies();
    const token =  cookiesStore.get('token')?.value;
    if (token) {
      redirect('/');
    }
    
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
      padding: 2,
    }}>
      <LoginForm />
    </Box>
  );
}
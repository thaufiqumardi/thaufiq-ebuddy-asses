import { Box } from "@mui/material";

export default function HomePage() {
  return (
    <Box sx={{ display: "flex", flexDirection: 'column', border: '1px dashed', flex: 1, alignItems: "center", justifyContent: "center" }}>
      <h1 className="text-2xl font-bold text-fuchsia-950">Welcome to the Dashboard</h1>
      <p className="text-lg text-gray-600">This is just dummy dashboard.</p>
    </Box>
  )
}
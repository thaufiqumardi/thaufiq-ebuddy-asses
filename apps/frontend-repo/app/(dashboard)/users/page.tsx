import DataTable from '@components/user/table';
import { Box, Typography } from '@mui/material';

export default function UsersPage() {
  return (
    <Box sx={{
      display: 'flex',
      flex: 1,
      boxShadow: 1,
      borderRadius: 2,
      padding: 2,
      flexDirection: 'column',
      }}>
      <Typography variant="h5" color="primary" sx={{ marginBottom: 2 }}>
        Users
      </Typography>
      <DataTable />
    </Box>
  )
}
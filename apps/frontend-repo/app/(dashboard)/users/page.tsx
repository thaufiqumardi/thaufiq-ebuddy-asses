import DataTable from '@components/user/table';
import { Box,  } from '@mui/material';

export default function UsersPage() {
  return (
    <Box sx={{
      display: 'flex',
      flex: 1,
      padding: 2,
      flexDirection: 'column',
      }}>
      <DataTable />
    </Box>
  )
}
'use client';
import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store/';
import {
  setUsers,
  setNextCursor,
  setTotal,
  setPrevCursor,
  setPage,
  addCursor,
  setPageSize,
  setError,
  clearError,
} from '@/store/userSlice';
import { fetchUsers as fetchUsersFromAPI } from '@/api/user';
import { Box, Typography } from '@mui/material';

const columns: GridColDef[] = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 130,
    sortable: false,
    disableColumnMenu: true,
  },
  { 
    field: 'name', 
    headerName: 'Fullname', 
    sortable: false, 
    disableColumnMenu: true,
  },
  { field: 'email', 
    headerName: 'Email', 
    minWidth: 200,
    sortable: false, 
    disableColumnMenu: true,
  },
  {
    field: 'createdAt',
    headerName: 'Registered At',
    width: 190,
    type: 'string',
    sortable: false,
    disableColumnMenu: true,
    valueGetter: (_, row) =>
      new Date(row.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
  },
];

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, nextCursor, page, total, cursors, pageSize, error } = useSelector((state: RootState) => state.user);

  const handleFetchUsers = async (cursor?: number, limit: number =10) => {
    try {
      const data = await fetchUsersFromAPI({ cursor, limit});
      dispatch(setUsers(data.users));
      dispatch(setTotal(data.total));
      dispatch(setNextCursor(data.nextCursor));
      dispatch(setPrevCursor(data.prevCursor));
      dispatch(addCursor(cursor || null));
      dispatch(clearError());
    } catch (error) {
      dispatch(setError((error as { message?: string })?.message || 'An unknown error occurred')); // Set error in the store
    }
  };

  const handlePaginationChange = (model: { page: number; pageSize: number }) => {
    const newPage = model.page + 1;
    const newPageSize = model.pageSize;
    dispatch(setPageSize(newPageSize)); // Update page size in the store
    if (newPage > page) {
      handleFetchUsers(nextCursor ? parseInt(nextCursor, 10) : undefined, newPageSize);
      dispatch(setPage(newPage));
    } else if (newPage < page) {
      const prevPageCursor = cursors[newPage - 1]; 
      handleFetchUsers(prevPageCursor ? parseInt(prevPageCursor, 10) : undefined, newPageSize);
      dispatch(setPage(newPage));
    } else {
      handleFetchUsers(cursors[page - 1] as unknown as number, newPageSize); // Fetch users with the new page size
    }
  };
  useEffect(() => {
    handleFetchUsers();
    console.log("Fetching users...");
  }, []);

  return (
    <Box sx={{display: 'flex', flex: 1, flexDirection: 'column' }}>
      <Typography variant="h5" color="primary" sx={{ marginBottom: 2 }}>
        Users
      </Typography>
      { error && (
        <Typography variant="body1" color="error" sx={{ marginBottom: 2 }}>
          Error fetching user: {error}
        </Typography>
      )}
      <DataGrid
        disableRowSelectionOnClick
        disableColumnSelector
        rows={users}
        columns={columns}
        pageSizeOptions={[10, 20, 50]}
        rowCount={total}
        paginationMode="server"
        paginationModel={{ page: page - 1, pageSize }}
        onPaginationModelChange={handlePaginationChange}
        sx={{ display: 'flex', flex: 1 }}
      />
    </Box>
  );
}

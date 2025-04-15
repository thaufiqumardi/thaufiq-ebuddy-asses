'use client';

import React, { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store/index';
import {
  setUsers,
  setNextCursor,
  goToPreviousCursor,
  setTotal,
} from '@/store/userSlice';
import { fetchUsers as fetchUsersFromAPI } from '@/api/user';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Fullname', width: 160, sortable: false },
  { field: 'email', headerName: 'Email', width: 90 },
  {
    field: 'createdAt',
    headerName: 'Registered At',
    width: 130,
    type: 'string',
    valueGetter: (_, row) =>
      new Date(row.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
  },
];

export default function UsersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, nextCursor, page, total } = useSelector((state: RootState) => state.user);

  const handleFetchUsers = async (cursor?: number) => {
    const data = await fetchUsersFromAPI({ cursor, limit: 5 });
    dispatch(setUsers(data.users));
    dispatch(setTotal(data.total));
    dispatch(setNextCursor(data.nextCursor));
  };

  const handlePaginationChange = (model: { page: number; pageSize: number }) => {
    const newPage = model.page + 1;

    if (newPage > page) {
      handleFetchUsers(nextCursor ? parseInt(nextCursor, 10) : undefined);
    } else {
      dispatch(goToPreviousCursor());
    }
  };
  useEffect(() => {
    // Initial fetch only
    handleFetchUsers(); // No cursor = fetch page 1
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl mb-2">Users</h1>
      <DataGrid
        disableRowSelectionOnClick
        disableColumnSelector
        rows={users}
        columns={columns}
        pageSizeOptions={[5]}
        rowCount={total}
        paginationMode="server"
        paginationModel={{ page: page - 1, pageSize: 5 }}
        onPaginationModelChange={handlePaginationChange}
        sx={{ border: 0, height: 400 }}
      />
    </div>
  );
}

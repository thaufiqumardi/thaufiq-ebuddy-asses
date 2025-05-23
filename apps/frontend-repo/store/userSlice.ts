import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@shared/types/user';

interface UserState {
  users: User[];
  total: number;
  page: number;
  cursors: (string | null)[];
  nextCursor: string | null;
  prevCursor: string | null;
  pageSize: number;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  total: 0,
  page: 1,
  cursors: [null],
  nextCursor: null,
  prevCursor: null,
  pageSize: 10,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
    setNextCursor(state, action) {
      state.nextCursor = action.payload;
    },
    setPrevCursor(state, action) {
      state.prevCursor = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    addCursor(state, action) {
      // Add the cursor for the current page
      state.cursors[state.page - 1] = action.payload;
    },
    goToNextCursor(state) {
      state.page += 1;
    },
    setTotal(state, action) {
      state.total = action.payload;
    },
    setPageSize(state, action: PayloadAction<number>) {
      state.pageSize = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setUsers, setTotal, setNextCursor, setPrevCursor, addCursor, setPage, setPageSize, setError, clearError } = userSlice.actions;

export default userSlice.reducer;
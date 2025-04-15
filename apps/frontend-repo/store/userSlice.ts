import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@shared/types/user';

interface PaginationState {
  users: User[];
  nextCursor: number | null;
  prevCursor: number[]; // to support "go back"
  total: number;
  page: number;
}

interface UserState {
  users: User[];
  total: number;
  page: number;
  cursors: (string | null)[];
  nextCursor: string | null;
}

const initialState: UserState = {
  users: [],
  total: 0,
  page: 1,
  cursors: [null], // first page = null cursor
  nextCursor: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setNextCursor(state, action: PayloadAction<string | null>) {
      state.nextCursor = action.payload;
      if (action.payload !== null) {
        state.cursors.push(action.payload);
        state.page += 1;
      }
    },
    goToPreviousCursor(state) {
      if (state.page > 1) {
        state.page -= 1;
        state.cursors.pop();
        state.nextCursor = state.cursors[state.cursors.length - 1] ?? null;
      }
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;

      // Optional: reset cursor stack if jumping pages manually
      state.cursors = [null];
      state.nextCursor = null;
    },
  },
});

export const { setUsers, setTotal, setNextCursor, goToPreviousCursor, setPage } = userSlice.actions;

export default userSlice.reducer;
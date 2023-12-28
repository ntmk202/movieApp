// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, logOutUser, registerUser } from './userAsync';
import { LoginUser, User } from '~/src/utils/types/user.type';

interface UserState {
  loading: boolean;
  auth: boolean;
  error: string | null;
  token: string | null;
  data: User[]; 
  dataLogin: LoginUser[];
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
  auth: false,
  data: [],
  dataLogin: []
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.auth = false
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.auth = true
        state.dataLogin = action.payload;
        state.token = action.payload.token
      })
    builder
    .addCase(logOutUser.pending, (state) => {
      state.loading = true;
      state.auth = true
      state.error = null;
    })
    .addCase(logOutUser.fulfilled, (state) => {
      state.loading = false;
      state.auth = false
    })
  },
});

const userReducer = userSlice.reducer;
export const { setToken } = userSlice.actions;
export default userReducer;
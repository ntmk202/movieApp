import { AsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Showtime } from '~/src/utils/types/timeshow.type';
import { getAllTimeshows } from './timeshowAsyncs';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>


interface TimeshowState {
  timeshowList: Showtime[];
  isSuccess: boolean;
  message: string;
  loading: boolean;
  error: null | any;
  getId: Showtime | null;
}
const initialState: TimeshowState = {
  timeshowList: [],
  isSuccess: false,
  message: '',
  loading: false,
  error: null,
  getId: null,
};

const timeshowSlice = createSlice({
  name: 'showtimes',
  initialState,
  reducers: {
    getIdTimeshows: (state, action: PayloadAction<string>) => {
      const showId = action.payload
      const foundId = state.timeshowList.find((showtime) => showtime.id === showId) || null
      state.getId = foundId
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTimeshows.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTimeshows.fulfilled, (state, action) => {
        state.loading = false;
        state.timeshowList = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllTimeshows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { getIdTimeshows } = timeshowSlice.actions;
const timeshowReducer = timeshowSlice.reducer;
export default timeshowReducer;

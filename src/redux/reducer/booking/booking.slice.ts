import { AsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Booking, Pay } from '~/src/utils/types/booking.type';
import { addBookings, createPayPalOrder } from './bookingAsyncs';
import { string } from 'yup';

interface BookingState {
  bookingList: Booking[];
  payment: Pay[]
  isSuccess: boolean;
  message: string;
  loading: boolean;
  error: null | any;
  getIdBooking: Booking | null;
  paypalLink: string | null;
  orderId: string | null;
}
const initialState: BookingState = {
  bookingList: [],
  payment: [],
  isSuccess: false,
  message: '',
  loading: false,
  error: null,
  getIdBooking: null,
  paypalLink: null,
  orderId: null,
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setOrderId: (state, action: PayloadAction<string>) => {
      state.orderId = action.payload;
    },
    setPaymentLink: (state, action: PayloadAction<string>) => {
      state.paypalLink = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingList.push(action.payload);
        state.isSuccess = true;
      })
      .addCase(addBookings.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.isSuccess = false;
        })
      // .addCase(createPayPalOrder.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.bookingList.push(action.payload);
      //     state.isSuccess = true;
      //   })
    },
});

export const { setOrderId, setPaymentLink } = bookingSlice.actions;
const bookingReducer = bookingSlice.reducer;
export default bookingReducer;

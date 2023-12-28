import { createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../http';
import { Booking } from '~/src/utils/types/booking.type';
import { setOrderId, setPaymentLink } from './booking.slice';
import { useAppDispatch } from '../../store';

export const addBookings = createAsyncThunk(
  'addBookings',
  async (body: Booking, thunkAPI) => {
    try {
      const response = await http.post<Booking>('bookings/', body, {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: thunkAPI.signal,
      });
      //   console.log(response.status)
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      if (error.name === 'AxiosError' && error.response.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

//   export const getPaypalLink = createAsyncThunk(
//     "getPaypalLink",
//     async (_, thunkAPI) => {
//       const response = await http.post('movies',{
//         signal: thunkAPI.signal
//       })
//       // console.log(response.data);
//       return response.data
//     }
//   );

export const createPayPalOrder = createAsyncThunk(
  'createPayPalOrder',
  async (_, thunkAPI) => {
    try {
      // Make the API call to create a PayPal order
      const response = await http.post('paypal/create/order', {
        signal: thunkAPI.signal
      });

      const orderId = response.data.id;
      const paymentLink = response.data.links.find((link: any) => link.rel === 'approve');
      
      // Dispatch actions to update Redux state
      // dispatch(setOrderId(orderId));
      // dispatch(setPaymentLink(paymentLink.href));
      console.log(response.data)
    //   return response.data
    } catch (error:any) {
      console.error('Error creating PayPal order:', error.response);
      // Handle error as needed
      throw error;
    }
  }
);
function dispatch(arg0: any) {
    
    // const dispatch = useAppDispatch()
    throw new Error('Function not implemented.');
}


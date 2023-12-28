import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginUser, User } from '~/src/utils/types/user.type';
import http from "../../http";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// export const registerUser = createAsyncThunk('user/register', async (data: User) => {
//   const response = await fetch('https://movie-api-service-lxyr.onrender.com/api/register/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     console.log(response.json())
//     throw new Error('Registration failed');
//   }

//   return await response.json();
// });

// export const registerUser = createAsyncThunk('user/register', async (body:User) => {
//     try {
//       const response = await axios.post('https://movie-api-service-lxyr.onrender.com/api/register/', body);
//       return response.data; // Assuming the response contains user data
//     } catch (error) {
//         console.log(error)
//       throw error;
//     }
//   });

export const registerUser = createAsyncThunk('register', async (body: User , thunkAPI) => {
    try {
      const response = await http.post<User>('register/', body, {
        headers: {
            'Content-Type': 'application/json',
          },
        signal: thunkAPI.signal,
        timeout: 3000
      })
      console.log(response.status)
      return response.data
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
    //   console.log(error.response.data)
      throw error
    }
  })

  export const loginUser = createAsyncThunk('login', async (body: LoginUser , thunkAPI) => {
    try {
      const response = await http.post<LoginUser>('login/', body, {
        headers: {
            'Content-Type': 'application/json',
          },
        signal: thunkAPI.signal,
        timeout: 3000
      })
      console.log(response.data)
      return response.data
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
    }
  })

  export const logOutUser = createAsyncThunk('logout', async (thunkAPI) => {
    await AsyncStorage.clear();
  });

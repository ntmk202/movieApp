import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginUser, User } from '~/src/utils/types/user.type';
import http from "../../http";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const registerUser = createAsyncThunk('register', async (body: User, thunkAPI) => {
  try {
    const response = await http.post<User>('register/', body, {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: thunkAPI.signal,
      timeout: 3000
    })

    return response.data
  } catch (error: any) {
    if (error.name === 'AxiosError' && error.response.status === 422) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
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
      // console.log(response.data.user)
      return response.data.user
    } catch (error: any) {
      if (error.name === 'AxiosError' && error.response.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error
    }
  })



// export const getInforUser = createAsyncThunk(
//   'getUserProfile',
//   async (fullname: string, thunkAPI) => {
//     try {
//       const rawData = await AsyncStorage.getItem('persist:user');
//       if (rawData === null || typeof rawData !== 'string') {
//         throw new Error();
//       }
//       const parsedData = JSON.parse(rawData);
//       // const token = parsedData.token;
//       const token = parsedData.token.replace(/^"(.*)"$/, '$1');
//       console.log(token)

//       const response = await http.get<User>(`/users/profile/${fullname}`, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Token ${token}`,
//         },
//         signal: thunkAPI.signal,
//         timeout: 3000,
//       });

//       return response.data;
//     } catch (error: any) {
//       console.log(error.response.data)
//       throw error;
//     }
//   }
// );

export const getInforUser = createAsyncThunk('user/fetchUserProfile', async (fullname: string, thunkAPI) => {
  try {
    const rawData = await AsyncStorage.getItem('persist:user');
    if (rawData === null || typeof rawData !== 'string') {
      throw new Error();
    }
    const parsedData = JSON.parse(rawData);

    const token = parsedData.token.replace(/^"(.*)"$/, '$1');
    const response = await fetch(`https://movie-api-service-lxyr.onrender.com/api/users/profile/${fullname}/`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return data;

  } catch (error: any) {
    console.log(error.response.data)
  }
});

export const updateInforUser = createAsyncThunk(
  'user/updateUserProfile',
  async (userData: User, thunkAPI) => {
    try {
      const rawData = await AsyncStorage.getItem('persist:user');
      if (rawData === null || typeof rawData !== 'string') {
        throw new Error();
      }
      const parsedData = JSON.parse(rawData);


      const token = parsedData.token.replace(/^"(.*)"$/, '$1');
      const response = await fetch(`https://movie-api-service-lxyr.onrender.com/api/users/profile/${userData.fullname}/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

    
      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }
      const updatedData = await response.json();


      return updatedData;
    } catch (error: any) {
      console.log(error)
      if (error.name === 'AxiosError' && error.response.status === 422) {
        return thunkAPI.rejectWithValue(error.response.data)
      }
      throw error 
    }
  }
);

export const logOutUser = createAsyncThunk('logout', async (thunkAPI) => {
  await AsyncStorage.clear();
});


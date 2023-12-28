// import {configureStore} from '@reduxjs/toolkit'
// import movieReducer from './reducer/movies/movie.slice'
// import { useDispatch } from 'react-redux'
// import timeshowReducer from './reducer/timeshows/timeshow.slice'
// import userReducer from './reducer/users/userSlice'

// export const store = configureStore({
//     reducer: {
//         movies: movieReducer,
//         showtimes: timeshowReducer,
//         user: userReducer
//     }
// })

// export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch

// export const useAppDispatch = () => useDispatch<AppDispatch>()

// store.ts

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import movieReducer from './reducer/movies/movie.slice';
import timeshowReducer from './reducer/timeshows/timeshow.slice';
import userReducer from './reducer/users/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import bookingReducer from './reducer/booking/booking.slice';


const userPersistConfig = {
    key: 'user',
    storage: AsyncStorage,
    blacklist: ['loading', 'error', 'data', 'dataLogin'],
    whitelist: ['token',  'auth'],
  };
  
  const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    movies: movieReducer,
    showtimes: timeshowReducer,
    bookings: bookingReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

import {configureStore} from '@reduxjs/toolkit'
import movieReducer from './reducer/movies/movie.slice'
import { useDispatch } from 'react-redux'
import timeshowReducer from './reducer/timeshows/timeshow.slice'

export const store = configureStore({
    reducer: {
        movies: movieReducer,
        showtimes: timeshowReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
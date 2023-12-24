import {configureStore} from '@reduxjs/toolkit'
import movieReducer from './reducer/movies/movie.slice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
    reducer: {
        movies: movieReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
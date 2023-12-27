import { AsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Movie } from '~/src/utils/types/movie.type';
import { getAllMovies } from './movieAsyncs';

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>


interface MovieState {
  movieList: Movie[];
  isSuccess: boolean;
  message: string;
  loading: boolean;
  error: null | any;
  getIdMovie: Movie | null;
  getTitleMovie: Movie |null ;
}
const initialState: MovieState = {
  movieList: [],
  isSuccess: false,
  message: '',
  loading: false,
  error: null,
  getIdMovie: null,
  getTitleMovie: null,
};

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    getIdMovie: (state, action: PayloadAction<string>) => {
      const movieId = action.payload
      const foundMovie = state.movieList.find((movie) => movie.id === movieId) || null
      state.getIdMovie = foundMovie
    },
    searchMovie: (state, action: PayloadAction<string>) => {
      const movieTitle = action.payload
      const search = state.movieList.find((movie) => movie.title === movieTitle) || null
      state.getTitleMovie = search
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movieList = action.payload;
        state.isSuccess = true;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isSuccess = false;
      });
  },
});

export const { getIdMovie, searchMovie } = movieSlice.actions;
const movieReducer = movieSlice.reducer;
export default movieReducer;

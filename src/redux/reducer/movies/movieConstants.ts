import { createAsyncThunk } from "@reduxjs/toolkit";
import { Movie } from "~/src/utils/types/movie.type";
import http from "../../http";

export const getAllMovies = createAsyncThunk(
    "getAllMovies",
    async (_, thunkAPI) => {
      const response = await http.get<Movie[]>('movies',{
        signal: thunkAPI.signal
      })
      // console.log(response.data);
      return response.data
    }
  );

  export const readIdMovies = createAsyncThunk(
    "getIdMovies",
    async (movieId: String, thunkAPI) => {
      const response = await http.get<Movie[]>(`movies/${movieId}`,{
        signal: thunkAPI.signal
      })
      // console.log(response.data);
      return response.data
    }
  );
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Showtime } from "~/src/utils/types/timeshow.type";
import http from "../../http";

export const getAllTimeshows = createAsyncThunk(
    "getAllTimeshows",
    async (_, thunkAPI) => {
      const response = await http.get<Showtime[]>('timeshows',{
        signal: thunkAPI.signal
      })
      // console.log(response.data);
      return response.data
    }
  );

import { createAsyncThunk } from "@reduxjs/toolkit";
import { Showtime } from "~/src/utils/types/timeshow.type";
import http from "../../http";

export const getAllTimeshows = createAsyncThunk(
    "getAllTimeshows",
    async ({id, idMovie, showtime}:any, thunkAPI) => {
      try {
        // Determine the URL based on the provided parameters
        let url = 'showtimes/';
        const queryParams = [];
  
        if (id) {
          queryParams.push(`id=${id}`);
        }
        if (idMovie) {
          queryParams.push(`idMovie=${idMovie}`);
        }
        if (showtime) {
          queryParams.push(`showtime=${showtime}`);
        }
        if (queryParams.length > 0) {
          url += `?${queryParams.join('&')}`;
        }
  
        const response = await http.get<Showtime[]>(url,{
          signal: thunkAPI.signal
        })
        // console.log('res: ',response.status)
        return response.data;
      } catch (error:any) {
        // Handle error here
        throw error;
      }
  
    }
  );

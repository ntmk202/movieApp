import { Movie } from "./movie.type";

export interface Showtime {
    data: any;
    id: string;
    movie: Movie[];
    roomNumber: string;
    showtime: string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
}
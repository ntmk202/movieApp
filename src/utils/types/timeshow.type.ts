export interface Showtime {
    data: any;
    id: string;
    movie: Moviedetail[];
    roomNumber: string;
    showtime: string;
    time: Time[];
    available_seats: Seat[],
    isAvailable: boolean;
}

interface Moviedetail {
    id: string;
    title: string;
    posterImage: string;
    release_date?: string;
    durationInMinutes: number;
}

interface Time {
    startTime: string;
    endTime: string;
}

interface Seat {
    id: string,
    seatNo: string;
    is_available: boolean;
}
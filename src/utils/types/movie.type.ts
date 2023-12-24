export interface Movie {
    data: any;
    id: string;
    title: string;
    trailer: string;
    genre: string;
    tagline: string;
    description: string;
    posterImage: string;
    release_date?: string;
    durationMinutes: number;
    director?: string;
    views?: number;
    rating?: string;
    isAvailable: boolean;
}
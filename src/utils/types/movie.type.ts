export interface Movie {
    data: any;
    actors:Actor[]
    id: string;
    title: string;
    trailer: string;
    genre: string;
    tagline: string;
    description: string;
    posterImage: string;
    release_date?: string;
    durationInMinutes: number;
    director?: string;
    views?: number;
    rating?: string;
    isAvailable: boolean;
}

interface Actor {
    id: number;
    name: string;
    image: string;
    character: string;
  }
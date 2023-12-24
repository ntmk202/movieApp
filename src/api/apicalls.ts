const apikey: string = 'f7168afe8afc12b47d513f032604cca5';
export const baseImagePath = (size: string, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
export const nowPlayingMovies: string = `http://movie-api-service-lxyr.onrender.com/api/movies`;
export const upcomingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
export const searchMovies = (keyword: string) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
};
export const movieDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};
export const movieCastDetails = (id: number) => {
  return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`;
};

export const data = {
  "dates": {
      "maximum": "2023-12-06",
      "minimum": "2023-10-25"
  },
  "page": 1,
  "results": [
      {
          "adult": false,
          "backdrop_path": "/9PqD3wSIjntyJDBzMNuxuKHwpUD.jpg",
          "genre_ids": [
              16,
              35,
              10751
          ],
          "id": 1075794,
          "original_language": "en",
          "original_title": "Leo",
          "overview": "Jaded 74-year-old lizard Leo has been stuck in the same Florida classroom for decades with his terrarium-mate turtle. When he learns he only has one year left to live, he plans to escape to experience life on the outside but instead gets caught up in the problems of his anxious students — including an impossibly mean substitute teacher.",
          "popularity": 1828.905,
          "poster_path": "/pD6sL4vntUOXHmuvJPPZAgvyfd9.jpg",
          "release_date": "2023-11-17",
          "title": "Leo",
          "video": false,
          "vote_average": 7.727,
          "vote_count": 309
      },
      {
          "adult": false,
          "backdrop_path": "/xgGGinKRL8xeRkaAR9RMbtyk60y.jpg",
          "genre_ids": [
              16,
              10751,
              10402,
              14,
              35
          ],
          "id": 901362,
          "original_language": "en",
          "original_title": "Trolls Band Together",
          "overview": "When Branch’s brother, Floyd, is kidnapped for his musical talents by a pair of nefarious pop-star villains, Branch and Poppy embark on a harrowing and emotional journey to reunite the other brothers and rescue Floyd from a fate even worse than pop-culture obscurity.",
          "popularity": 1121.642,
          "poster_path": "/qV4fdXXUm5xNlEJ2jw7af3XxuQB.jpg",
          "release_date": "2023-10-12",
          "title": "Trolls Band Together",
          "video": false,
          "vote_average": 7.238,
          "vote_count": 231
      },
    ],
    "total_pages": 1,
    "total_results": 4719
}
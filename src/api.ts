const API_KEY = '586c54411c347f5699d01264369dfd5e';
const BASE_PATH = 'https://api.themoviedb.org/3';

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetDetailMoviesResult {
  id: number;
  overview: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

export const getMovies = () => {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then((response) => response.json());
};

export const getMoviesDetail = (movieId?: string) => {
  return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then((response) => response.json());
};

export const getMoviesUpcoming = () => {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then((response) => response.json());
};
export const getMoviesPopular = () => {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then((response) => response.json());
};

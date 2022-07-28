import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovies, IGetMoviesResult } from '../api';
const Home = () => {
  const { data, isLoading } = useQuery<IGetMoviesResult>(['movies', 'nowPlaying'], getMovies);
  console.log(data, isLoading);
  return (
    <>
      <div style={{ backgroundColor: 'black', height: '200vh' }}></div>
    </>
  );
};

export default Home;

import React from 'react';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('keyword');
  console.log(search);
  return <div>Search</div>;
};

export default Search;

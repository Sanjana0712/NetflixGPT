import { useEffect } from 'react';
import { API_OPTIONS } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';
import { useSelector } from 'react-redux';

const useNowPlayingMovies = () => {
  //Fetches data from TMDBAPI and stores it in store
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector((store)=>store.movies.nowPlayingMovies);
  const getNowPlayingMovies = async() => {
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
    const json = await data.json();
    console.log(json.results);
    dispatch(addNowPlayingMovies(json.results));
  };

  //Making API inside useEffect to call only once when component mounts
  useEffect(() => {
    if(!nowPlayingMovies) getNowPlayingMovies();
  },[]);
}

export default useNowPlayingMovies;
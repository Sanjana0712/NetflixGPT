import { API_OPTIONS } from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTrailerVideo } from '../utils/moviesSlice'

const useMovieTrailer = async (movieId) => {

    const dispatch = useDispatch();

    //Fetch trailer and store it in store
  const getMovieVideos = async() => {
    const data = await fetch("https://api.themoviedb.org/3/movie/"+movieId+"/videos", API_OPTIONS);
    const json = await data.json();

    //Filter trailer from all videos and return first one
    const filterData = json.results.filter((video) => video.type === "Trailer");
    
    //If filterData is empty, return first video
    const trailer = filterData.length ? filterData[1]:json.results[0];
    dispatch(addTrailerVideo(trailer));
  };

  //Making API inside useEffect to call only once when component mounts
  useEffect(() => {
    getMovieVideos();
  },[]);

}

export default useMovieTrailer;
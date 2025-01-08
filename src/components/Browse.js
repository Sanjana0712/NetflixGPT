import React, { useEffect } from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import usePopularMovies from '../hooks/usePopularMovies'
import useTrendingMovies from '../hooks/useTrendingMovies'
import useUpcomingMovies from '../hooks/useUpcomingMovies'

const Browse = () => {

  //Calling custom hook
  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useUpcomingMovies();

  return (
    <div className='grid grid-rows-2'>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/> 
    </div>
  )
}

export default Browse
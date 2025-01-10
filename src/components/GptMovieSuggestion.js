import React, { useState } from 'react'
import {useSelector } from 'react-redux'
import MovieList from './MovieList'
import VideoBackground from './VideoBackground'


const GptMovieSuggestion = () => {
  const {movieNames, movieResults} = useSelector((store) => store.gpt);

  if(!movieNames) return null;

  return (
    <div className='p-4 m-4 text-white bg-opacity-70'>
      
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList 
            key={movieName} 
            title={movieName} 
            movies={movieResults[index]} 
          />
        ))}
       
      </div>
      
    </div>
  )
}

export default GptMovieSuggestion
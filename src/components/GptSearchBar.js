import { useDispatch, useSelector } from "react-redux"
import lang from "../utils/languageConstants"
import { useRef, useState } from "react"
import { openai } from "../utils/openai"
import { addGptMovieResults} from "../utils/gptSlice"
import { API_OPTIONS } from "../utils/constants"

const GptSearchBar = () => {

    const dispatch = useDispatch();
    const langKey = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    const [searchError, setSearchError] = useState(null);

    const searchMoviesTMDB = async(movie) => {
        const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&page=1", API_OPTIONS);
        
        const json = await data.json();
        return json.results;
    };

    const handleGptSearchClick = async () => {
      //Get the search text using ref
        if(!searchText.current.value){
          setSearchError("Please enter something to search");
          return;
        }

        const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query" + searchText.current.value + ". only give me names of 5 movies, comma separated like the example result given ahead. Example Result: The Shawshank Redemption, The Godfather, The Dark Knight, Inception, Schindler's List";

        //Make API Call to get the movie results
        const gptResults = await openai.chat.completions.create({
            messages: [{ role: 'user', content: gptQuery }],
            model: 'gpt-3.5-turbo',
          });

        console.log(gptResults.choices?.[0]?.message?.content); 
        
        //Returns an array of movies
        const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

        //Search for each of the movies returned in the array in TMDB
        const promiseArray = gptMovies.map((movie) => searchMoviesTMDB(movie));
        
        //returns an array of promises as javascript makes all the api calls in parallel
        const tmdbResults = await Promise.all(promiseArray);

        //Store the gptMovies and tmdbResults in Redux store
        dispatch(addGptMovieResults({movieNames: gptMovies, movieResults: tmdbResults}));
    };

    return (
      <div className='h-[50vh] flex justify-center items-center'>
        <form className='w-2/3 grid grid-cols-12 mx-auto' 
        onSubmit={(e)=>e.preventDefault()}>

        {searchError && alert(searchError)}

          <input 
          ref={searchText}
          type="text" 
          className='p-4 m-4 rounded col-span-9 text-lg' 
          placeholder={lang[langKey].gptSearchPlaceholder} /> 

          <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white font-bold text-lg rounded'
          onClick={handleGptSearchClick}>
            {lang[langKey].search}
          </button>
        </form>
      </div>
    )
  }
  
  export default GptSearchBar

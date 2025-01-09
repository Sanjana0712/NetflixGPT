import { useSelector } from "react-redux"
import lang from "../utils/languageConstants"

const GptSearchBar = () => {

    const langKey = useSelector((store) => store.config.lang);

    return (
      <div className='h-[50vh] flex justify-center items-center'>
        <form className='w-1/2 bg-black grid grid-cols-12 mx-auto'>

          <input 
          type="text" 
          className='p-4 m-4 rounded col-span-9' 
          placeholder={lang[langKey].gptSearchPlaceholder} /> 

          <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded'>
            {lang[langKey].search}
          </button>
        </form>
      </div>
    )
  }
  
  export default GptSearchBar

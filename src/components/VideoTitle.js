import React from 'react'

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-5xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-1/2">{overview}</p>
      <div className="my-4 md:m-0">
        <button className=" bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl rounded-lg hover:bg-opacity-80">
          ▶️ Play
        </button>
        <button className="hidden md:inline-block mx-2  bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
         ℹ More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;



// const VideoTitle = ({title, overview}) => {
//   return (
//     <div className='pt-36 px-12 absolute text-white bg-gradient-to-r from-black'>
//         <h1 className="text-5xl font-bold">{title}</h1>
//         <p className='py-6 text-lg w-1/2'>{overview}</p>
//         <div>
//             <button className='bg-gray-500 text-white p-4 px-12 text-xl opacity-50 rounded'>▶️ Play</button>
//             <button className='bg-gray-500 text-white p-4 mx-2 px-12 text-xl opacity-50 rounded'>ℹ️ More Info</button>
//         </div>
//     </div>
//   )
// }

// export default VideoTitle
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return;

  const mainMovie = movies[0];

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="pt-[30%] bg-black md:pt-0 min-h-[80vh]">
      <VideoBackground movieId={id} />
      <VideoTitle title={original_title} overview={overview} />
    </div>
  );
};
export default MainContainer;
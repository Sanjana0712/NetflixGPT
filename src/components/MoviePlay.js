import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
import React from "react";


const MoviePlay = () => {
  const [key, setKey] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    playMovie();
  },[id]);

  const playMovie = async () => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      API_OPTIONS
    );
    const data = await res.json();

    const filterData = data.results.filter((v) => {
      return v.type === "Trailer";
    });

    const trailer = filterData?.length ? filterData[0] : data?.results[0];

    if (trailer && trailer.key) {

      setKey(trailer.key);
    }
  };

  return (
    <div>
      <iframe
        className="w-screen aspect-video h-screen"
        src={"https://www.youtube.com/embed/" + key + "?&autoplay=1&mute=1"}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
    </div>
  );
};

export default MoviePlay;
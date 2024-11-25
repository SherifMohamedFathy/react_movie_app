import React, { useEffect, useState } from "react";

export default function WatchList({ watchListMovies, removeFromWatchList, transferToWatched }) {
  const [localWatchListMovies, setLocalWatchListMovies] = useState(watchListMovies);

  useEffect(() => {
    setLocalWatchListMovies(watchListMovies);
  }, [watchListMovies]);

  function handleRemove(id) {
    removeFromWatchList(id);
    const updatedMovies = localWatchListMovies.filter((movie) => movie.imdbID !== id);
    setLocalWatchListMovies(updatedMovies);
    localStorage.setItem("listMovie", JSON.stringify(updatedMovies)); // Update localStorage

    const storedDisabled = JSON.parse(localStorage.getItem("watchList")) || {};
    delete storedDisabled[id]; // Update disabled buttons
    localStorage.setItem("watchList", JSON.stringify(storedDisabled));
  }

  function handleToWatched(id) {
    transferToWatched(id);
  }
  return (
    <div className="watched container">
      <div className="top d-flex justify-content-between mt-4">
        <h3>My WatchList</h3>
        <div className="numberOfMovie">
          <span>{localWatchListMovies.length}</span> Movies
        </div>
      </div>
      <div className="watchedBody">
        {localWatchListMovies.length > 0 ? (
          localWatchListMovies.map((watchListMovie) => (
            <div className="poster " key={watchListMovie.imdbID}>
              <img src={watchListMovie.Poster} alt={watchListMovie.Title} />
              <div className="icon-parent position-relative">
                <div className="icons">
                  <i onClick={() => handleRemove(watchListMovie.imdbID)} className="fa fa-close" aria-hidden="true"></i>
                  <i
                    onClick={() => handleToWatched(watchListMovie.imdbID)}
                    className="fa fa-eye notSlash"
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              <p className="title">{watchListMovie.Title}</p>
            </div>
          ))
        ) : (
          <h2 className="w-100">No movies in your watch list.</h2>
        )}
      </div>
    </div>
  );
}

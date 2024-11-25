import React, { useEffect, useState } from "react";

export default function Watched({ watchedMovies, removeFromWatched, transferToWatchList }) {
  const [localWatchedMovies, setLocalWatchedMovies] = useState(watchedMovies);

  useEffect(() => {
    setLocalWatchedMovies(watchedMovies);
  }, [watchedMovies]);

  function handleRemove(id) {
    removeFromWatched(id); // Call parent function to update App state
    const updatedMovies = localWatchedMovies.filter((movie) => movie.imdbID !== id);
    setLocalWatchedMovies(updatedMovies); // Update local state
    localStorage.setItem("movieWatched", JSON.stringify(updatedMovies)); // Update localStorage

    const storedDisabled = JSON.parse(localStorage.getItem("watchMovies")) || {};
    delete storedDisabled[id]; // Update disabled buttons
    localStorage.setItem("watchMovies", JSON.stringify(storedDisabled));
  }

  function handleToWatchList(id) {
    transferToWatchList(id);
  }
  return (
    <div className="watched container">
      <div className="top d-flex justify-content-between mt-4">
        <h3>My Watched</h3>
        <div className="numberOfMovie">
          <span>{localWatchedMovies.length}</span> Movies
        </div>
      </div>
      <div className="watchedBody">
        {localWatchedMovies.length > 0 ? (
          localWatchedMovies.map((watchedMovie) => (
            <div className="poster " key={watchedMovie.imdbID}>
              <img src={watchedMovie.Poster} alt={watchedMovie.Title} />
              <div className="icon-parent position-relative">
                <div className="icons">
                  <i onClick={() => handleRemove(watchedMovie.imdbID)} className="fa fa-close" aria-hidden="true"></i>
                  <i
                    className="fa-solid fa-eye-slash slash"
                    onClick={() => handleToWatchList(watchedMovie.imdbID)}
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
              <p className="title">{watchedMovie.Title}</p>
            </div>
          ))
        ) : (
          <h2 className="w-100">No movies in your watched list.</h2>
        )}
      </div>
    </div>
  );
}
// export default function Watched({ watchedMovies, removeFromWatched, transferToWatchList, watchedDisabled }) {
//   const [localWatchedMovies, setLocalWatchedMovies] = useState(watchedMovies);

//   useEffect(() => {
//     setLocalWatchedMovies(watchedMovies);
//   }, [watchedMovies]);

//   function handleRemove(id) {
//     removeFromWatched(id);
//   }

//   function handleToWatchList(id) {
//     transferToWatchList(id);
//   }

//   return (
//     <div className="watched container">
//       <div className="top d-flex justify-content-between mt-4">
//         <h3>My Watched</h3>
//         <div className="numberOfMovie">
//           <span>{localWatchedMovies.length}</span> Movies
//         </div>
//       </div>
//       <div className="watchedBody">
//         {localWatchedMovies.length > 0 ? (
//           localWatchedMovies.map((watchedMovie) => (
//             <div className="poster" key={watchedMovie.imdbID}>
//               <img src={watchedMovie.Poster} alt={watchedMovie.Title} />
//               <div className="icon-parent position-relative">
//                 <div className="icons">
//                   <i onClick={() => handleRemove(watchedMovie.imdbID)} className="fa fa-close" aria-hidden="true"></i>
//                   <i
//                     className="fa-solid fa-eye-slash slash"
//                     onClick={() => handleToWatchList(watchedMovie.imdbID)}
//                     aria-hidden="true"
//                     disabled={watchedDisabled[watchedMovie.imdbID]} // Disable the button
//                   ></i>
//                 </div>
//               </div>
//               <p className="title">{watchedMovie.Title}</p>
//             </div>
//           ))
//         ) : (
//           <h2 className="w-100">No movies in your watched list.</h2>
//         )}
//       </div>
//     </div>
//   );
// }

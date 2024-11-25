import React, { useEffect, useState } from "react";
import AddMovie from "./components/AddMovie";
import WatchList from "./components/WatchList";
import Watched from "./components/Watched";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [watchedMovies, setWatchedMovies] = useState(() => {
    const storedMovies = localStorage.getItem("movieWatched");
    return storedMovies ? JSON.parse(storedMovies) : [];
  });

  const [watchListMovies, setWatchListMovies] = useState(() => {
    const storedWatchList = localStorage.getItem("listMovie");
    return storedWatchList ? JSON.parse(storedWatchList) : [];
  });

  useEffect(() => {
    localStorage.setItem("movieWatched", JSON.stringify(watchedMovies));
    localStorage.setItem("listMovie", JSON.stringify(watchListMovies));
  }, [watchedMovies, watchListMovies]);

  const addToWatched = (movie) => {
    if (!watchedMovies.some((watchedMovie) => watchedMovie.imdbID === movie.imdbID)) {
      setWatchedMovies([...watchedMovies, movie]);
    }
  };

  const addToWatchList = (movie) => {
    if (!watchListMovies.some((listMovie) => listMovie.imdbID === movie.imdbID)) {
      setWatchListMovies([...watchListMovies, movie]);
    }
  };

  const removeFromWatched = (id) => {
    const updatedWatchedMovies = watchedMovies.filter((movie) => movie.imdbID !== id);
    setWatchedMovies(updatedWatchedMovies);
  };

  const removeFromWatchList = (id) => {
    const updatedWatchListMovies = watchListMovies.filter((movie) => movie.imdbID !== id);
    setWatchListMovies(updatedWatchListMovies);
  };

  const transferToWatched = (id) => {
    const movie = watchListMovies.find((m) => m.imdbID === id);
    if (movie) {
      setWatchListMovies(watchListMovies.filter((m) => m.imdbID !== id));
      setWatchedMovies([...watchedMovies, movie]);
    }
  };

  const transferToWatchList = (id) => {
    const movie = watchedMovies.find((m) => m.imdbID === id);
    if (movie) {
      setWatchedMovies(watchedMovies.filter((m) => m.imdbID !== id));
      setWatchListMovies([...watchListMovies, movie]);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<AddMovie addToWatched={addToWatched} addToWatchList={addToWatchList} />} />
          <Route
            path="/watchList"
            element={
              <WatchList
                watchListMovies={watchListMovies}
                transferToWatched={transferToWatched}
                removeFromWatchList={removeFromWatchList}
              />
            }
          />
          <Route
            path="/watched"
            element={
              <Watched
                transferToWatchList={transferToWatchList}
                watchedMovies={watchedMovies}
                removeFromWatched={removeFromWatched}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
// export default function App() {
//   const [watchedMovies, setWatchedMovies] = useState(() => {
//     const storedMovies = localStorage.getItem("movieWatched");
//     return storedMovies ? JSON.parse(storedMovies) : [];
//   });

//   const [watchListMovies, setWatchListMovies] = useState(() => {
//     const storedWatchList = localStorage.getItem("listMovie");
//     return storedWatchList ? JSON.parse(storedWatchList) : [];
//   });

//   // State for tracking which movies have buttons disabled
//   const [watchedDisabled, setWatchedDisabled] = useState(() => {
//     const storedDisabled = localStorage.getItem("watchedDisabled");
//     return storedDisabled ? JSON.parse(storedDisabled) : {};
//   });

//   const [watchListDisabled, setWatchListDisabled] = useState(() => {
//     const storedDisabled = localStorage.getItem("watchListDisabled");
//     return storedDisabled ? JSON.parse(storedDisabled) : {};
//   });

//   useEffect(() => {
//     localStorage.setItem("movieWatched", JSON.stringify(watchedMovies));
//     localStorage.setItem("listMovie", JSON.stringify(watchListMovies));
//     localStorage.setItem("watchedDisabled", JSON.stringify(watchedDisabled));
//     localStorage.setItem("watchListDisabled", JSON.stringify(watchListDisabled));
//   }, [watchedMovies, watchListMovies, watchedDisabled, watchListDisabled]);

//   const addToWatched = (movie) => {
//     if (!watchedMovies.some((watchedMovie) => watchedMovie.imdbID === movie.imdbID)) {
//       setWatchedMovies([...watchedMovies, movie]);
//       setWatchedDisabled({ ...watchedDisabled, [movie.imdbID]: true });
//       setWatchListDisabled({ ...watchListDisabled, [movie.imdbID]: false });
//     }
//   };

//   const addToWatchList = (movie) => {
//     if (!watchListMovies.some((listMovie) => listMovie.imdbID === movie.imdbID)) {
//       setWatchListMovies([...watchListMovies, movie]);
//       setWatchListDisabled({ ...watchListDisabled, [movie.imdbID]: true });
//       setWatchedDisabled({ ...watchedDisabled, [movie.imdbID]: false });
//     }
//   };

//   const removeFromWatched = (id) => {
//     setWatchedMovies(watchedMovies.filter((movie) => movie.imdbID !== id));
//     setWatchedDisabled({ ...watchedDisabled, [id]: false });
//   };

//   const removeFromWatchList = (id) => {
//     setWatchListMovies(watchListMovies.filter((movie) => movie.imdbID !== id));
//     setWatchListDisabled({ ...watchListDisabled, [id]: false });
//   };

//   const transferToWatched = (id) => {
//     const movie = watchListMovies.find((m) => m.imdbID === id);
//     if (movie) {
//       setWatchListMovies(watchListMovies.filter((m) => m.imdbID !== id));
//       setWatchedMovies([...watchedMovies, movie]);
//       setWatchListDisabled({ ...watchListDisabled, [id]: false });
//       setWatchedDisabled({ ...watchedDisabled, [id]: true });
//     }
//   };

//   const transferToWatchList = (id) => {
//     const movie = watchedMovies.find((m) => m.imdbID === id);
//     if (movie) {
//       setWatchedMovies(watchedMovies.filter((m) => m.imdbID !== id));
//       setWatchListMovies([...watchListMovies, movie]);
//       setWatchedDisabled({ ...watchedDisabled, [id]: false });
//       setWatchListDisabled({ ...watchListDisabled, [id]: true });
//     }
//   };

//   return (
//     <BrowserRouter>
//       <Header />
//       <Routes>
//         <Route path="/" element={<AddMovie addToWatched={addToWatched} addToWatchList={addToWatchList} />} />
//         <Route
//           path="/watchList"
//           element={
//             <WatchList
//               watchListMovies={watchListMovies}
//               transferToWatched={transferToWatched}
//               removeFromWatchList={removeFromWatchList}
//               watchListDisabled={watchListDisabled}
//             />
//           }
//         />
//         <Route
//           path="/watched"
//           element={
//             <Watched
//               transferToWatchList={transferToWatchList}
//               watchedMovies={watchedMovies}
//               removeFromWatched={removeFromWatched}
//               watchedDisabled={watchedDisabled}
//             />
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

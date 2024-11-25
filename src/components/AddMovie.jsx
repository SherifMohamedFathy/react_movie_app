import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function AddMovie({ addToWatched, addToWatchList }) {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(() => {
    const storedDisabled = localStorage.getItem("watchMovies");
    return storedDisabled ? JSON.parse(storedDisabled) : {};
  });
  const [disabledList, setDisabledList] = useState(() => {
    const storedDisabled = localStorage.getItem("watchList");
    return storedDisabled ? JSON.parse(storedDisabled) : {};
  });
  const ref = useRef();
  const searchTimeout = useRef(null);
  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      let response = await axios.get(`https://www.omdbapi.com/?s=${searchName}&apikey=fc2e44dd`);

      setData(response.data.Search);
      console.log(data);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  function handleSearch() {
    clearTimeout(searchTimeout.current);

    const nameMovie = ref.current.value;

    searchTimeout.current = setTimeout(() => {
      setSearchName(nameMovie);
    }, 500);
  }
  useEffect(() => {
    if (searchName) {
      fetchData();
    }
  }, [searchName]);
  useEffect(() => {
    fetchData();
  }, []);
  function handleAddToWatchList(movie) {
    const updateDisabled = {
      ...disabledList,
      [movie.imdbID]: true,
    };

    setDisabledList(updateDisabled);
    localStorage.setItem("watchList", JSON.stringify(updateDisabled));

    addToWatchList(movie);
  }
  function handleAddToWatched(movie) {
    const updateDisabled = {
      ...disabled,
      [movie.imdbID]: true,
    };

    setDisabled(updateDisabled);
    localStorage.setItem("watchMovies", JSON.stringify(updateDisabled));

    addToWatched(movie);
  }

  return (
    <div className="container text-center search">
      <input type="text" onChange={handleSearch} ref={ref} placeholder="Enter your movie . . ." />
      <div className="body my-3">
        {loading && <h4>Loading...</h4>}
        {error && <h4>{error}</h4>}
        {data && data.length > 0
          ? data.map((item) => (
              <div className="box d-flex flex-column  flex-md-row w-50 m-auto" key={item.imdbID}>
                <img className="img" src={item.Poster} alt={item.Title} />
                <div className="text1">
                  <p className="m-0">{item.Title} </p> <p className="m-0 ">{item.Year}</p>
                  <div className="btns d-flex flex-column mb-3  flex-md-row ">
                    <button
                      className="mb-3 toWatchList"
                      disabled={disabledList[item.imdbID]}
                      style={disabledList[item.imdbID] ? { opacity: "0.5" } : {}}
                      onClick={() => handleAddToWatchList(item)}
                    >
                      Add To Watch List
                    </button>

                    <button
                      onClick={() => handleAddToWatched(item)}
                      className="mb-3 toWatched"
                      disabled={disabled[item.imdbID]}
                      style={disabled[item.imdbID] ? { opacity: "0.5" } : {}}
                    >
                      Add To Watched
                    </button>
                  </div>
                </div>
              </div>
            ))
          : !loading && !error && (searchName.length < 1 ? "" : <h4>No results found</h4>)}
      </div>
    </div>
  );
}

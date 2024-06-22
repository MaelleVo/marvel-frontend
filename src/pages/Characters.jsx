import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Cookie js
import Cookies from "js-cookie";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Components
import SearchBar from "../components/SearchBar";

import bgMovie2 from "/img/bg-animate2.mp4";

const Characters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const limit = 100;

  const nextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const previousPage = () => {
    const prevPage = currentPage - 1;
    setCurrentPage(prevPage);
  };

  const addFav = (comic) => {
    const newFavorites = [...favorites, comic];
    setFavorites(newFavorites);
    Cookies.set("favorites", JSON.stringify(newFavorites), { expires: 7 });
  };

  const removeFav = (comicId) => {
    const newFavorites = favorites.filter((fav) => fav._id !== comicId);
    setFavorites(newFavorites);
    Cookies.set("favorites", JSON.stringify(newFavorites), { expires: 7 });
  };

  const isFavorite = (comicId) => {
    return favorites.some((fav) => fav._id === comicId);
  };

  const handleSearch = (value) => {
    setSearch(value);
    setIsSearching(true);
    setCurrentPage(1);
  };

  const fetchSuggestions = async (event) => {
    try {
      const response = await axios.get(`http://localhost:3000/characters`, {
        params: { name: event.query, limit: 5 },
      });
      setSuggestions(response.data.results);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--q5cw8vtfqtbn.code.run/characters`,
          {
            params: {
              name: search,
              page: currentPage,
              limit: limit,
              skip: currentPage,
            },
          }
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
        // console.log(limit);
        console.log(isSearching);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search, currentPage, limit, isSearching]);

  useEffect(() => {
    const savedFavorites = Cookies.get("favorites");
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        if (Array.isArray(parsedFavorites)) {
          setFavorites(parsedFavorites);
        } else {
          console.error("Favorites is not an array");
        }
      } catch (error) {
        console.error("Failed to parse favorites from cookies", error);
      }
    }
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section className="container">
      <video src={bgMovie2} autoPlay loop></video>
      <SearchBar
        search={search}
        setSearch={handleSearch}
        suggestions={suggestions}
        completeMethod={fetchSuggestions}
      />
      <div className="button-settings">
        {currentPage > 1 ? (
          <div className="button-holder">
            <button className="button-page" onClick={previousPage}>
              <FontAwesomeIcon icon="arrow-left" />
            </button>
          </div>
        ) : (
          <button className="button-page hidden" onClick={previousPage}>
            <FontAwesomeIcon icon="arrow-left" />
          </button>
        )}
        <span className="current-page">{currentPage}</span>
        {data && (
          <div className="button-holder">
            <button className="button-page" onClick={nextPage}>
              <FontAwesomeIcon icon="arrow-right" />
            </button>
          </div>
        )}
      </div>
      <div>
        <div className="section-characters">
          {data.results.map((result) => {
            const url =
              result.thumbnail.path +
              "/" +
              "standard_xlarge" +
              "." +
              result.thumbnail.extension;
            // console.log(url);
            const characterId = result._id;
            //   console.log(characterId)
            return (
              <>
                <div className="sticker-characters">
                  <div className="top-card-characters">
                    {isFavorite(characterId) ? (
                      <FontAwesomeIcon
                        icon="heart"
                        className="heart-favorite"
                        onClick={() => removeFav(characterId)}
                        style={{ color: "red" }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon="heart"
                        className="heart-favorite"
                        onClick={() => addFav(result)}
                        style={{ color: "grey" }}
                      />
                    )}
                  </div>
                  <Link
                    key={characterId}
                    to={`/character/${characterId}`}
                    className="link-characters"
                  >
                    <div>
                      <img src={url} alt={url} />
                      <h3>{result.name}</h3>

                      <p>{result.description}</p>
                    </div>
                  </Link>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Characters;

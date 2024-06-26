import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import bgMovie2 from "/img/bg-animat.mp4";

// Cookie js
import Cookies from "js-cookie";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import Components
import SearchBar from "../components/SearchBar";

const Comics = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const [favorites, setFavorites] = useState([]);

  const limit = 100;

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setIsSearching(true);
    setCurrentPage(1);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--q5cw8vtfqtbn.code.run/comics",
          {
            params: {
              title: search,
              page: currentPage,
              limit: limit,
              skip: currentPage,
            },
          }
        );
        console.log(response.data);
        console.log(limit);
        console.log(isSearching);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
      //   console.log(setLimit);
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
    <div>
      <video src={bgMovie2} autoPlay loop></video>
      <span>En cours de chargement...</span>
    </div>
  ) : (
    <section className="container">
      <video src={bgMovie2} autoPlay loop></video>
      <SearchBar search={search} setSearch={handleSearch} />
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
          <button className="button-page" onClick={nextPage}>
            <FontAwesomeIcon icon="arrow-right" />
          </button>
        )}
      </div>
      <div className="section-comics">
        {data.results.map((result) => {
          const url = result.thumbnail.path + "." + result.thumbnail.extension;
          // console.log(url);
          const comicId = result._id;
          //   console.log(comicId);
          return (
            <div className="wrap-section-comics" key={comicId}>
              <div className="comic-card">
                <div className="top-card-characters">
                  {isFavorite(comicId) ? (
                    <FontAwesomeIcon
                      icon="heart"
                      className="heart-favorite"
                      onClick={() => removeFav(comicId)}
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
                <Link className="link-characters" to={`/comic/${comicId}`}>
                  <img src={url} alt={url} />
                  <h3>{result.title}</h3>
                  <p>{result.description}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Comics;

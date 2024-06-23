// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

// Cookie js
import Cookies from "js-cookie";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import bgMovie2 from "/img/bg-animate2.mp4";

const Favorites = () => {
  const token = Cookies.get("token");

  const [favorites, setFavorites] = useState([]);

  const addFav = (comic) => {
    const newFavorites = [...favorites, comic];
    setFavorites(newFavorites);
    Cookies.set("favorites", JSON.stringify(newFavorites), { expires: 20 });
  };

  const removeFav = (comicId) => {
    const newFavorites = favorites.filter((fav) => fav._id !== comicId);
    setFavorites(newFavorites);
    Cookies.set("favorites", JSON.stringify(newFavorites), { expires: 20 });
  };

  const isFavorite = (comicId) => {
    return favorites.some((fav) => fav._id === comicId);
  };

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

  return (
    <div className="page-favorites">
      <video src={bgMovie2} autoPlay loop></video>
      <h2>Vos Favoris</h2>
      <div className="section-favorites container">
        {token && favorites.length > 0 ? (
          favorites.map((result) => {
            const url =
              result.thumbnail.path +
              "/" +
              "portrait_xlarge" +
              "." +
              result.thumbnail.extension;
            const comicId = result._id;
            return (
              <div className="wrap-section-favorites" key={comicId}>
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
                  <img src={url} alt={result.title} />
                  <p>{result.title}</p>
                  <p>{result.description}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-favorite">Pas de favoris pour le moment...</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;

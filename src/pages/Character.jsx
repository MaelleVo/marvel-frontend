import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Character = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--q5cw8vtfqtbn.code.run/comics/${id}`
        );
        console.log(response.data);
        setCharacter(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  let url = "";
  if (character.thumbnail) {
    url = `${character.thumbnail.path}/portrait_xlarge.${character.thumbnail.extension}`;
  }

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section className="container">
      <div className="character-sticker">
        <img src={url} alt={url} />
        <h2>{character.name}</h2>
        <p>{character.description}</p>
      </div>
      <article className="character-list-comics">
        {character.comics.map((comic, index) => {
          console.log(comic.title);
          const urlComic =
            comic.thumbnail.path +
            "/" +
            "portrait_xlarge" +
            "." +
            comic.thumbnail.extension;
          return (
            <div key={index}>
              <p> {comic.title} </p>
              <img src={urlComic} alt={urlComic} />
            </div>
          );
        })}
      </article>
    </section>
  );
};

export default Character;

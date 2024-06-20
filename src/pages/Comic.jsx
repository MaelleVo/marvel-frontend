import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Comic = () => {
  const { id } = useParams();
  const [comic, setComic] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comic/${id}`);
        console.log(response.data);
        setComic(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  let url = "";
  if (comic.thumbnail) {
    url = `${comic.thumbnail.path}/portrait_xlarge.${comic.thumbnail.extension}`;
  }

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section className="container">
      <img src={url} alt={url} />
      <h2>{comic.title}</h2>
      <p>{comic.description}</p>
    </section>
  );
};

export default Comic;

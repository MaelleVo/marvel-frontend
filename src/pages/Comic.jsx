import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import bgMovie2 from "/img/bg-animate2.mp4";

const Comic = () => {
  const { id } = useParams();
  const [comic, setComic] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--q5cw8vtfqtbn.code.run/comic/${id}`
        );
        console.log(response.data);
        setComic(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [id]);

  let url;
  if (comic.thumbnail) {
    url = `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`;
  }

  // const url =
  //   comic.thumbnail.path +
  //   "/" +
  //   "portrait_xlarge" +
  //   "." +
  //   comic.thumbnail.extension;

  // console.log(comic);
  // console.log(comic.thumbnail);
  // console.log(comic.thumbnail.path);
  // console.log(comic.thumbnail.extension);

  // console.log(url);

  return isLoading ? (
    <div>
      <video src={bgMovie2} autoPlay loop></video>
      <span>En cours de chargement...</span>
    </div>
  ) : (
    <section className="section-comic container">
      <video src={bgMovie2} autoPlay loop></video>
      <img src={url} alt={url} />
      <h2>{comic.title}</h2>
      <p>{comic.description}</p>
    </section>
  );
};

export default Comic;

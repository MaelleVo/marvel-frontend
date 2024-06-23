import bgMovie from "/img/bg-animate.mp4";

const Home = () => {
  return (
    <section className="marvel-bg">
      <video src={bgMovie} autoPlay loop></video>
    </section>
  );
};

export default Home;

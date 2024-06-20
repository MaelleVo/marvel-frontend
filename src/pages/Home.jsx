import bgMovie from "/img/bg-animate.mp4";
// import Background from "../components/Background";

const Home = () => {
  return (
    <section className="marvel-bg">
      <video src={bgMovie} autoPlay loop></video>
    </section>
  );
};

export default Home;

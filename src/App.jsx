import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

// Font Awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faArrowRight, faArrowLeft);

// COMPONENTS IMPORT
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";

// PAGES IMPORT
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import Favorites from "./pages/Favorites";
import Comic from "./pages/Comic";
import Character from "./pages/Character";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  const [search, setSearch] = useState("");
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comic/:id" element={<Comic />} />
          <Route
            path="/"
            element={<SearchBar search={search} setSearch={setSearch} />}
          />
          <Route path="/characters" element={<Characters />} />
          <Route path="/character/:id" element={<Character />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

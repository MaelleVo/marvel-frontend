import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const token = Cookies.get("token");
  // Cookies.get("token");
  // console.log(Cookies.get("token"));
  // console.log(token);

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <header>
      <nav className="container">
        <div>
          <Link to="/">
            <img src="/img/marvel-logo.png" alt="marvel-logo" />
          </Link>
        </div>
        <div className="div-buttons">
          <Link to="/characters">
            <button className="button-page">Personnages</button>
          </Link>
          <Link to="/comics">
            <button className="button-page">Comics</button>
          </Link>
          <Link to="/favorites">
            <button className="button-page">Favoris</button>
          </Link>
          {token ? (
            <button id="red" className="button-page2" onClick={handleLogout}>
              Se deconnecter
            </button>
          ) : (
            <Link to="/login">
              <button className="button-page2">Se connecter</button>
            </Link>
          )}
          {token ? (
            <Link to="/signup">
              <button className="none">S'inscrire</button>
            </Link>
          ) : (
            <Link to="/signup">
              <button className="button-page2">S'inscrire</button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

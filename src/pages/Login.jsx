import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import bgMovie2 from "/img/bg-animate2.mp4";

// Cookies
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://site--marvel-backend--q5cw8vtfqtbn.code.run/login",
        {
          email,
          password,
        }
      );
      console.log(response);
      // console.log(response.data.token); // => token here
      const token = response.data.token;
      //   console.log(token);
      Cookies.set("token", token, { expires: 1 });
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login marvel-bg container">
      <video src={bgMovie2} autoPlay loop></video>

      <form onSubmit={handleSubmit} className="form-area">
        <h3>Se Connecter</h3>

        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={handleEmailChange}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" value="Submit" style={{ cursor: "pointer" }}>
          Se connecter
        </button>
        <Link to="/signup" className="link">
          <p>Pas encore de compte ? Inscris-toi !</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;

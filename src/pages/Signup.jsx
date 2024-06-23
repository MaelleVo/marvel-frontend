import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Cookies
import Cookies from "js-cookie";
import bgMovie2 from "/img/bg-animate2.mp4";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

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
    console.log(username, email, password);
    try {
      const response = await axios.post(
        "https://site--marvel-backend--q5cw8vtfqtbn.code.run/signup",
        {
          username,
          email,
          password,
        }
      );
      console.log(response.data);
      // console.log(response.data.token); // => token here
      const token = response.data.token;
      console.log(token);
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
        <h3>S'inscrire</h3>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit" value="Submit" style={{ cursor: "pointer" }}>
          S'inscrire
        </button>
        <Link to="/login" className="link">
          <p className="link-account">
            Tu as deja un compte ? Connecte-toi ici !
          </p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;

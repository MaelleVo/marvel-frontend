import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Cookies
import Cookies from "js-cookie";

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
      const response = await axios.post("http://localhost:3000/signup", {
        username,
        email,
        password,
      });
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
    <div className="signup container">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
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
        <Link to="/login" style={{ textDecoration: "none" }}>
          <p className="link-account">Tu as déjà un compte ? Connecte-toi !</p>
        </Link>
      </form>
    </div>
  );
};

export default Signup;

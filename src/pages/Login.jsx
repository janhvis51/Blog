import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function loginUser() {

    try {

      const response =
        await axios.post(
          "http://https://blog-udlp.onrender.com/auth/login",
          {
            email,
            password
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );
         window.location.href = "/";
         navigate("/");
      alert(
        response.data.message
      );

   

    } catch (error) {

      console.log(error);

      alert("Login Failed");

    }

  }

  return (

    <div className="auth-container">

      <h2>Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button
        onClick={loginUser}
      >
        Login
      </button>

    </div>

  );

}

export default Login;
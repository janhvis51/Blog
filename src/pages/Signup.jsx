import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function signupUser() {

    try {

      const response =
        await axios.post(
          "https://blog-udlp.onrender.com/blogs://blog-udlp.onrender.com/auth/signup",
          {
            name,
            email,
            password
          }
        );

      alert(
        response.data.message
      );

      setName("");
      setEmail("");
      setPassword("");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Signup Failed");

    }

  }

  return (

   <div className="auth-container">

      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

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
        onClick={signupUser}
      >
        Signup
      </button>

    </div>

  );

}

export default Signup;
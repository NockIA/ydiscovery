import "../styles/signup.css";
import React, { useState } from "react";
import { apiUrl } from "../../utils/api";
import AuthService from "../../services/auth_services";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SingUp() {
  const [Email, setEmail] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [Nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const _authService = new AuthService();
  const navigate = useNavigate();

  const signUp = async () => {
    await axios
      .post(apiUrl + "auth/register", {
        email: Email,
        firstname: Prenom,
        lastname: Nom,
        password: password,
      })
      .then((response) => {
        _authService.setCookie(response.data.token);
        navigate("/");
      });
  };

  return (
    <>
      <div className="container">
        <div>
          <h1>Sign In</h1>
          <h5>Hello and welcome ! We are delighted to see you again. Please enter your credentials below to access your account.</h5>
        </div>
        <div className='container_inputs' >
          <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} type="email" />
          <input placeholder='Firstname' onChange={(e) => setPrenom(e.target.value)} type="text" />
          <input placeholder='Lastname' onChange={(e) => setNom(e.target.value)} type="text" />
          <input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password" />
          <button className='button' onClick={signUp}>continuer</button>

        </div>
        <div className='container-account'>
          <h5>You do not have an account ?</h5>
          <Link to={'/signup'}>create a account</Link>
        </div>
      </div>
    </>
  );
}

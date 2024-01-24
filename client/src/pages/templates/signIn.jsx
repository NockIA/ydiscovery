import '../styles/signin.css'
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { apiUrl } from '../../utils/api';
import AuthService from '../../services/auth_services';

export function SignIn() {
  const [emailController, setEmailController] = useState("");
  const [passwordController, setPasswordController] = useState("");
  const navigate = useNavigate();
  const _authService = new AuthService;

  const signIn = async () => {
    try {
      await axios
        .post(
          apiUrl + "auth/login",
          { email: emailController, password: passwordController },
        )
        .then((response) => {
          if (response.data.token) {
            _authService.setCookie(response.data.token);
            navigate("/");
          }
        })
        .catch((error) => {
          console.error(error.message);

        });
    } catch (error) {
      throw new Error("Error while trying to check if user is valid ");
    }
  };

  return (
    <>
      <div className='container'>
        <div>
          <h1>Sign In</h1>
          <h5>Hello and welcome ! We are delighted to see you again. Please enter your credentials below to access your account.</h5>
        </div>
        <div className='container_inputs' >
          <input placeholder='Email' type="email" className="form-control" onChange={(e) => setEmailController(e.target.value)} />
          <input placeholder='Password' type="password" className="form-control" onChange={(e) => setPasswordController(e.target.value)} />
          <button className='button' onClick={signIn}>SignIn</button>
        </div>
        <div className='container-account'>
          <h5>You do not have an account ?</h5>
          <Link to={'/signup'}>create a account</Link>
        </div>
      </div>

    </>
  )
}


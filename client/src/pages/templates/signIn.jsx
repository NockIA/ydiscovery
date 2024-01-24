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
      <div>
      <div className='container'>
            <div>
              <label>Email</label>
              <input type="email" className="form-control"  onChange={(e)=>setEmailController(e.target.value)}/>
            </div>
            <div>
              <label>mot de passe </label>
              <input type="password" className="form-control" onChange={(e)=>setPasswordController(e.target.value)}/>
            </div>
            <div>
              <button onClick={signIn}>SignIn</button>
            </div> 
      
        </div>
         
      </div>
    </>
  )
}


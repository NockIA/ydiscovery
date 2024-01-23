import '../styles/signup.css'
import React,{useState} from 'react'
import { apiUrl } from '../../utils/api'
import AuthService from '../../services/auth_services'
import axios from 'axios'

export function SingUp() {
  const [Email, setEmail] = useState('')
  const [Prenom, setPrenom] = useState('')
  const [Nom, setNom] = useState('')
  const [password ,setPassword] = useState('')
  const _authService = new AuthService;

  const signUp = async () => {
    try {
      await axios
        .post(
          apiUrl + "register",
          {
            email: Email,
            firstname: Prenom,
            lastname: Nom,
            password: password,
          },
       
        )
        .then((response) => {
          _authService.setCookie(response.data.token);
          navigate("/");
        });
    } catch (error) {
      throw new Error("Error while trying to add user to database");
    }
  };

  return (
    <>
      <div>
        <div className='container'>
            <div>
              <label>Email</label>
              <input onChange={(e)=>setEmail(e.target.value)} type="email" />
            </div>
            <div>
              <label>Prenom</label>
              <input onChange={(e)=>setPrenom(e.target.value)} type="text" />
            </div>
            <div>
              <label>Nom</label>
              <input onChange={(e)=>setNom(e.target.value)} type="text" />
            </div>
            <div>
              <label>password </label>
              <input onChange={(e)=>setPassword(e.target.value)} type="password" />
            </div>
            <div>
              <button onClick={signUp}>
                continuer
              </button>
            </div> 
        </div>
      </div>
    </>
  )
}


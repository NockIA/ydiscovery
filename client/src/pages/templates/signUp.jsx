import '../styles/signup.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export function SingUp() {
  const [Email, setEmail] = useState('')
  const [Prenom, setPrenom] = useState('')
  const [Nom, setNom] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <div className='container'>
        <div>
          <h1>Sign Up</h1>
          <h5>Sign up today to take advantage of all the benefits our platform offers. Complete the form below to create your account. </h5>
        </div>
        <div className='container_inputs'>
          <input className='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} type="email" />
          <input className='first-name' placeholder='First name' onChange={(e) => setPrenom(e.target.value)} type="texte" />
          <input className='last-name' placeholder='Last Name' onChange={(e) => setNom(e.target.value)} type="texte" />
          <input className='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} type="password" />
        </div>
        <button className='button'>
          continue
        </button>
        <div className='container-account'>
        <h5>Already have an account ?</h5>
        <Link to={'/signin'}>Login</Link>
        </div>
      </div>
    </>
  )
}



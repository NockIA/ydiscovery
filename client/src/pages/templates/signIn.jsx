import '../styles/signin.css'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
export function SignIn() {

  return (
    <>
      <div className='container'>
        <div>
          <h1>Sign In</h1>
          <h5>Hello and welcome ! We are delighted to see you again. Please enter your credentials below to access your account.</h5>
        </div>
        <div className='container_inputs' >
          <input placeholder='Email' type="email" className="form-control" />
          <input placeholder='Password' type="password" className="form-control" />
          <button>
            s'identifier
          </button>
        </div>
        <div className='container-account'>
        <h5>You do not have an account ?</h5>
        <Link to={'/signup'}>create a account</Link>
        </div>
      </div>
    </>
  )
}


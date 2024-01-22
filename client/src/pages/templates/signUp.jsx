import '../styles/signup.css'
import React,{useState} from 'react'

export function SingUp() {
  const [Email, setEmail] = useState('')
  const [Prenom, setPrenom] = useState('')
  const [Nom, setNom] = useState('')
  const [password ,setPassword] = useState('')

  return (
    <>
      <div>
        <div className='container'>
            <div>
              <label htmlFor="">Email</label>
              <input onChange={(e)=>setEmail(e.target.value)} type="email" />
            </div>
            <div>
              <label htmlFor="">Prenom</label>
              <input onChange={(e)=>setPrenom(e.target.value)} type="texte" />
            </div>
            <div>
              <label htmlFor="">Nom</label>
              <input onChange={(e)=>setNom(e.target.value)} type="texte" />
            </div>
            <div>
              <label htmlFor="">password </label>
              <input onChange={(e)=>setPassword(e.target.value)} type="password" />
            </div>
            <div>
              <button>
                continuer
              </button>
            </div> 
        </div>
      </div>
    </>
  )
}


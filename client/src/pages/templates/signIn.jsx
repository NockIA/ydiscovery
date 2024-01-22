import '../styles/signin.css'

export function SignIn() {
  
  return (
    <>
      <div>
      <div className='container'>
          <form action="" method="post">
            <div>
              <label htmlFor="">Email</label>
              <input type="email" className="form-control"/>
            </div>
            <div>
              <label htmlFor="">mot de passe </label>
              <input type="password" className="form-control"/>
            </div>
            <div>
              <button>
                s'identifier
              </button>
            </div> 
          </form>

        </div>
          <h1>SignIn</h1>
      </div>
    </>
  )
}


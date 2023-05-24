import axios from 'axios'
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'

function SignUp() {

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const navigate = useNavigate()

  const signUp = event => {
    event.preventDefault()
    if (password === password2) {
      axios.post('http://localhost:1337/api/auth/local/register', {
        username: username,
        email: email,
        password: password,
      })
        .then(res => {
          alert(`Успешно`)
          navigate('/sign-in')
        })
        .catch(err => alert(err))
    } else {
      alert('Password is doesnt match')
    }
  }

  return (
    <div className="sign">
      <h1>Регистрация</h1>
      <form className='sign__form' onSubmit={e => signUp(e)}>
        <input type="email" placeholder='email' value={email} onChange={e => setEmail(e.target.value)}/>
        <input type="text" placeholder='username' value={username} onChange={e => setUsername(e.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)}/>
        <input type="password" placeholder='confirm password' value={password2} onChange={e => setPassword2(e.target.value)}/>
        <button>Регистрация</button>
      </form>
      <p>
        У вас уже есть аккаунт? <Link to="/sign-in">Войти</Link>
      </p>
    </div>
  )
}


export default SignUp
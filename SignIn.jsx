import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }, [])

  const signIn = e => {
      e.preventDefault()
      axios.post('http://localhost:1337/api/auth/local', {
          identifier : username, password
      })
          .then(res => {
              console.log(res.data)
              localStorage.setItem('token', res.data.jwt)
              localStorage.setItem('user', JSON.stringify(res.data.user))
              navigate('/')
          })
          .catch(err => alert("Неверные данные"))
  }

  return (
    <div className="sign">
      <h1>Авторизация</h1>
      <form className='sign__form' onSubmit={e => signIn(e)}>
        <input type="text" placeholder='username' value={username} onChange={e => setUsername(e.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={e => setPassword(e.target.value)}/>
        <button>Вход</button>
      </form>
      <p>
        Не существует аккаунт? <Link to="/sign-up">Регистрация</Link>
      </p>
    </div>
  )
}

export default SignIn
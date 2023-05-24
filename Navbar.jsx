import React, { useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { RxExit } from 'react-icons/rx'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import './style.css'





function Navbar({ search }) {

  const [show, setShow] = useState(false)
  const [user] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <nav className='navbar'>
      <Link className='navbar__logo' to='/'>
        <img src={`https://avatars.mds.yandex.net/i?id=7ea32a71092e2e1d6e5093dc6eaba48b_sr-5208867-images-thumbs&n=13`} />
      </Link>
      <div className='navbar__menu'>
        <div className="navbar__start">
          <Link to='/' className='navbar__item'>ВСЕ</Link>
          <Link to='/detail/concerts' className='navbar__item'>КОНЦЕРТЫ</Link>
          <Link to='/detail/performers' className='navbar__item'>ИСПОЛЬНИТЕЛИ</Link>
          <Link to='/detail/places' className='navbar__item'>МЕСТА</Link>
        </div>
        <div className="navbar__end">
          {search ? (
            <i className='navbar__item' onClick={() => setShow(!show)}><BsSearch size={25} fill={'gray'} /></i>
          ) : ''}
          <Link to='/my-orders/' className='navbar__item'><FiShoppingCart size={25} /></Link>
          <Link to='/sign-in' className='navbar__item navbar__sign'><RxExit size={25} />{user ? "Выход" : "Войти"}</Link>
        </div>
      </div>
      {show ? (
        <input
          type="search"
          className='navbar__search'
          placeholder='ПОИСК СОБЫТИЙ И МЕСТ'
          onChange={e => search(e.target.value)}
        />
      ) : ''}
    </nav>
  )
}

export default Navbar 
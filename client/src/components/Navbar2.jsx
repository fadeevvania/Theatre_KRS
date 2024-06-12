import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/authContext";
import Logo from '../img/logo.png'
const Navbar2 = () => {
  const { currentUser, logout } = useContext(AuthContext);
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to="/">
            <h6>Спектакли</h6>
          </Link>
          <Link className='link' to="/posts2?cat2=actor">
            <h6>Актёры</h6>
          </Link>
          <Link className='link' to="/posts2?cat2=dubler">
            <h6>Дублёры</h6>
          </Link>
          <Link className='link' to="/posts2?cat2=director">
            <h6>Режиссёры</h6>
          </Link>
          <Link className='link' to="/posts2?cat2=sounder">
            <h6>Музыканты</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Выйти</span>
          ) : (
            <Link className='link' to="/login">
              Войти
            </Link>
          )}
          {currentUser?.role === 'admin' && (
            <span className='create'>
              <Link className='link' to="/create2">Создать</Link>
            </span>
          )}
          




        </div>
      </div>
    </div>
  )
}

export default Navbar2
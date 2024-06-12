import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/authContext";
import Logo from '../img/logo.png'

const Navbar = () => {
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
          <Link className='link' to="posts2">
            <h6>Персонал</h6>
          </Link>
          <Link className='link' to="/?cat=drama">
            <h6>Драма</h6>
          </Link>
          <Link className='link' to="/?cat=comedy">
            <h6>Комедия</h6>
          </Link>
          <Link className='link' to="/?cat=triller">
            <h6>Триллер</h6>
          </Link>
          <Link className='link' to="/?cat=tragedy">
            <h6>Трагедия</h6>
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
              <Link className='link' to="/create">Создать</Link>
            </span>
          )}
          
        </div>
      </div>
    </div>
  )
}

export default Navbar

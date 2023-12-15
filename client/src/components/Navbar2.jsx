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
            <h6>Актёр</h6>
          </Link>

          <Link className='link' to="/posts2?cat2=dubler">
            <h6>Дублёр</h6>
          </Link>
          <Link className='link' to="/posts2?cat2=director">
            <h6>Режиссёр</h6>
          </Link>
          <Link className='link' to="/posts2?cat2=sounder">
            <h6>Музыкант</h6>
          </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
          <span onClick={logout}>Выйти</span>
          ) : (<Link className='link' to="/login">
            Login
            </Link>)}
          <span className='create'>
            <Link className='link' to="/create2">Создать</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar2
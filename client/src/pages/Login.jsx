import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/authContext'

const Login=() =>{
  const [inputs,setInputs] = useState({
    username:"",
    password:"",
})

const[err,setError] = useState(null)

const navigate = useNavigate();

const {login} = useContext(AuthContext);


const handleChange = e =>{
    setInputs(prev =>({...prev,[e.target.name]:e.target.value}))
}

const handleSubmit = async e =>{ 
    e.preventDefault()
    try{
        await login(inputs)
        navigate("/");
    } catch(err){
        setError(err.response.data);
    }
}

  return (
    <div className='auth'>
        <h1>Вход</h1>
        <form >
        <input type="text" placeholder='Логин или почта' name="username" onChange={handleChange} />
        <input type="password" placeholder='Пароль' name="password" onChange={handleChange} />
        <button onClick={handleSubmit}>Войти</button>
        {err && <p>{err}</p>}
        <span> У вас еще нет аккаунта? <Link to="/register">Регистрация</Link></span>
        </form>
        </div>
  )
}

export default Login
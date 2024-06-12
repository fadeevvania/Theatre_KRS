import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Register = () => {
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
    })

    const [err, setError] = useState(null)

    const navigate = useNavigate();

    const handleChange = e => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.post("/auth/register", inputs);
            navigate("/login");
        } catch (err) {
            setError(err.response.data);
        }
    }

    return (
        <div className='auth'>
            <h1>Регистрация</h1>
            <form >
                <input type="text" placeholder='Логин' name='username' onChange={handleChange} required minLength="3" maxLength="20" />
                <input type="email" placeholder='Почта' name='email' onChange={handleChange} required />
                <input type="password" placeholder='Пароль' name='password' onChange={handleChange} required minLength="6" maxLength="20" />
                <button onClick={handleSubmit}>Регистрация</button>
                {err && <p>{err}</p>}
                <span> У ваc уже есть аккаунт? <Link to="/login">Войти</Link></span>
            </form>
        </div>
    )
}

export default Register
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import { useAuth } from "../context/authContext";


const Create2 = () => {
  
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || '');
  const [name, setName] = useState(state?.name || '');
  const [age, setAge] = useState(state?.age || '');
  const [file, setFile] = useState(null);
  const [cat2, setCat2] = useState(state?.cat2 || 'actor');
  const [exp, setExp] = useState(state?.exp || '');
  const [workplace, setWorkplace] = useState(state?.workplace || '');
  const [country, setCountry] = useState(state?.country || '');
  const [error, setError] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  if (!currentUser || currentUser.role !== "admin") {
    navigate("/login"); // Перенаправление на страницу входа
    return null;
  }
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
      setError('Проблема формата изображения');
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!name || !age || !exp || !workplace || !country || !value || !file) {
      setError('Все поля должны быть заполнены');
      return;
    }

    const imgUrl = await upload();

    try {
      if (state) {
        await axios.put(`/posts2/${state.id}`, {
          name,
          age,
          exp,
          workplace,
          country,
          desc: value,
          cat2,
          img: file ? imgUrl : '',
        });
      } else {
        await axios.post('/posts2/', {
          name,
          age,
          exp,
          workplace,
          country,
          desc: value,
          cat2,
          img: file ? imgUrl : '',
          date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        });
      }
      navigate('/posts2');
    } catch (err) {
      console.log(err);
      setError('Error creating actor');
    }
  };

  return (
    <div className='add'>
      <div className='content'>
        <input type='text' maxLength='50' placeholder='ФИО' value={name} onChange={(e) => setName(e.target.value)} />
        <input type='number' maxLength='2' placeholder='Возраст' value={age} onChange={(e) => setAge(e.target.value)} />
        <input type='number' maxLength='2' placeholder='Стаж работы' value={exp} onChange={(e) => setExp(e.target.value)} />
        <input type='text' placeholder='Место работы' value={workplace} onChange={(e) => setWorkplace(e.target.value)} />
        <input type='text' maxLength='25' placeholder='Город' value={country} onChange={(e) => setCountry(e.target.value)} />

        <div className='editorContainer'>
          <ReactQuill className='editor' theme='snow' value={value} onChange={setValue} />
        </div>
      </div>
      <div className='menu'>
        <div className='item'>
          <h1>Опубликовать</h1>
          <span>
            <b>Доступ:</b> Публичный
          </span>
          <input style={{ display: 'none' }} type='file' id='file' name='' onChange={(e) => setFile(e.target.files[0])} />
          <label className='file' htmlFor='file'>
            Добавить изображение
          </label>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className='buttons'>
            <button onClick={handleClick}>Опубликовать</button>
          </div>
        </div>
        <div className='item'>
          <h1>Вид деятельности</h1>
          {/* CAT = категории (Categories) */}
          <div className='cat'>
            <input type='radio' checked={cat2 === 'actor'} name='cat2' value='actor' id='actor' onChange={(e) => setCat2(e.target.value)} />
            <label htmlFor='actor'>Актёр</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat2 === 'dubler'} name='cat2' value='dubler' id='dubler' onChange={(e) => setCat2(e.target.value)} />
            <label htmlFor='dubler'>Дублёр</label>
          </div>
          <div className='cat'>
            <input type='radio' checked={cat2 === 'director'} name='cat2' value='director' id='director' onChange={(e) => setCat2(e.target.value)} />
            <label htmlFor='director'>Режиссёр</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat2 === "sounder"} name="cat2" value="sounder" id='sounder' onChange={e => setCat2(e.target.value)} />
            <label htmlFor="sounder">Композитор</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create2;
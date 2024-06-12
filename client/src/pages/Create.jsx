import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate,Navigate, useLocation,  } from 'react-router-dom';
import moment from 'moment';
import { useAuth } from "../context/authContext";

const Create = () => {
  const state = useLocation().state
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [enviroment,setInviroment] = useState(state?.enviroment ||"");
  const [time,setTime] = useState(state?.time ||"");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  if (!currentUser || currentUser.role !== "admin") {
    navigate("/login"); // Перенаправление на страницу входа
    return null;
  }
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!title || !value || !cat || !file || !time || !enviroment) {
      setError("Все поля должны быть заполнены");
      return;
    }

    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            time,
            enviroment,
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            time,
            enviroment,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='add' >
      <div className="content">
        <input type="text" placeholder='Название' value={title} onChange={e => setTitle(e.target.value)} />
        <input type='date' placeholder='Дата' maxLength='50'  value={time} onChange={(e) => setTime(e.target.value)} />
        <input type='text' placeholder='Место' maxLength='50' value={enviroment} onChange={(e) => setInviroment(e.target.value)} />

        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Опубликовать</h1>
          <span><b>Доступ:</b> Публичный
          </span>
          <input style={{ display: "none" }} type="file" id="file" name="" onChange={e => setFile(e.target.files[0])} />
          <label className='file' htmlFor="file">Добавить изображение</label>
          <div className="buttons">
            <button>сохранить в черновик</button>
            <button onClick={handleClick} >Опубликовать</button>
          </div>
          <div className="error">{error}</div> {/* Вывод ошибки */}
        </div>
        <div className="item">
          <h1>Жанр</h1>

          {/*CAT =  категории (Categories) */}

          <div className="cat">
            <input type="radio" checked={cat === "drama"} name="cat" value="drama" id='drama' onChange={e => setCat(e.target.value)} />
            <label htmlFor="drama">Драма</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat === "comedy"} name="cat" value="comedy" id='comedy' onChange={e => setCat(e.target.value)} />
            <label htmlFor="comedy">Комедия</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat === "triller"} name="cat" value="triller" id='triller' onChange={e => setCat(e.target.value)} />
            <label htmlFor="triller">Триллер</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat === "tragedy"} name="cat" value="tragedy" id='melodrama' onChange={e => setCat(e.target.value)} />
            <label htmlFor="tragedy">Трагедия</label>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Create
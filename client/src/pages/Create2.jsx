import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate, Navigate, useLocation, } from 'react-router-dom';
import moment from 'moment';

const Create2 = () => {
  const state = useLocation().state
  const [value, setValue] = useState(state?.desc || "");
  const [name, setName] = useState(state?.name || "");
  const [age, setAge] = useState(state?.age || "");
  const [file, setFile] = useState(null);
  const [cat2, setCat2] = useState(state?.cat2 || "");
  const [exp, setExp] = useState(state?.exp || "");
  const [workplace, setWorkplace] = useState(state?.workplace || "");
  const [country, setCountry] = useState(state?.country || "");

  const navigate = useNavigate()

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
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts2/${state.id}`, {
          name,
          age,
          exp,
          workplace,
          country,
          desc: value,
          cat2,
          img: file ? imgUrl : "",
        })
        : await axios.post(`/posts2/`, {
          name,
          age,
          exp,
          workplace,
          country,
          desc: value,
          cat2,
          img: file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      navigate("/posts2")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='add' >
      <div className="content">
        <input type="text" placeholder='Имя'  value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder='Возраст' value={age} onChange={e => setAge(e.target.value)} />
        <input type="text" placeholder='Стаж работы' value={exp} onChange={e => setExp(e.target.value)} />
        <input type="text" placeholder='Место работы' value={workplace} onChange={e => setWorkplace(e.target.value)} />
        <input type="text" placeholder='Страна' value={country} onChange={e => setCountry(e.target.value)} />

        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span><b>Visibility:</b> Public
          </span>
          <input style={{ display: "none" }} type="file" id="file" name="" onChange={e => setFile(e.target.files[0])} />
          <label className='file' htmlFor="file">Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick} >Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category2</h1>

          {/*CAT =  категории (Categories) */}

          <div className="cat">
            <input type="radio" checked={cat2 === "actor"} name="cat2" value="actor" id='actor' onChange={e => setCat2(e.target.value)} />
            <label htmlFor="actor">Актёр</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat2 === "dubler"} name="cat2" value="dubler" id='dubler' onChange={e => setCat2(e.target.value)} />
            <label htmlFor="dubler">Дублёр</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat2 === "director"} name="cat2" value="director" id='director' onChange={e => setCat2(e.target.value)} />
            <label htmlFor="director">Режиссёр</label>
          </div>

          <div className="cat">
            <input type="radio" checked={cat2 === "sounder"} name="cat2" value="sounder" id='sounder' onChange={e => setCat2(e.target.value)} />
            <label htmlFor="sounder">Музыкант</label>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Create2
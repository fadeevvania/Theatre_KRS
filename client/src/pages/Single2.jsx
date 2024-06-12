import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from "moment";
import { AuthContext } from '../context/authContext'
import DOMPurify from "dompurify"
const Single2 = () => {

  const [post2, setPost2] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const post2Id = location.pathname.split("/")[2]

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts2/${post2Id}`);
        setPost2(res.data);
        console.log(post2Id)
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [post2Id]);

  const handleDelete = async () => {

    try {
      await axios.delete(`/posts2/${post2Id}`);
      navigate("/")
    }
    catch (err) {
      console.log(err);

    }

  }
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post2?.img}`} alt="" />
        <div className="user">
          {post2.userImg && <img
            src={post2.userImg}
            alt=""
          />}
          {currentUser?.role === 'admin' && (
            <div className="edit">
              <Link to={`/create2?edit=2`} state={post2}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>)}

        </div>
        <h1>{post2.name}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post2.desc),
          }}
        ></p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize("Возраст: " + post2.age),
          }}
        ></p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize("Опыт работы: " + post2.exp),
          }}
        ></p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize("Место работы: " + post2.workplace),
          }}
        ></p>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize("Город: " + post2.country),
          }}
        ></p>
      </div>
      <Menu cat={post2.cat} />
    </div>
  )
}

export default Single2
import React, { useContext, useEffect, useState } from 'react'
import Edit from '../img/edit.png'
import Delete from '../img/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import axios from 'axios'
import moment from "moment";
import { AuthContext } from '../context/authContext'
import DOMPurify from "dompurify"

const Single = () => {
  const [post, setPost] = useState({}); 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${getMonthName(date.getMonth())} ${date.getFullYear()}`;
  };
 
  const getMonthName = (monthIndex) => {
    const months = [
      "января", "февраля", "марта", "апреля",
      "мая", "июня", "июля", "августа",
      "сентября", "октября", "ноября", "декабря"
    ];
    return months[monthIndex];
  };
  const location = useLocation();
  const navigate = useNavigate();
  
  const postId = location.pathname.split("/")[2]

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
        console.log(postId)
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Вы точно хотите удалить данный элемент?");
    if (confirmDelete) {
      try {
        await axios.delete(`/posts/${postId}`);
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  const addToCart = async (postId) => {
    try {
      const res = await axios.post("/add-to-cart", { post_id: postId });
      console.log(res.data); // Ответ от сервера
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.userImg && <img src={post.userImg} alt="" />}
          <div className="info">
          <p>{formatDate(post.time)}</p>
            <span>{post.enviroment}</span>
          </div>
          <br></br>
          {currentUser?.role === 'admin' && (
            <div className="edit">
              <Link to={`/create?edit=`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>)}
        </div>
        <h1>{post.title}</h1>
        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.desc)}}></p>
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}

export default Single

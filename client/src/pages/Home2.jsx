import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from "axios";


const Home2 = () => {

  const [posts2, setPosts2] = useState([])

  const cat2 = useLocation().search
  const getCatTranslation = (cat) => {
    switch (cat) {
      case "director":
        return "Режиссер";
      case "actor":
        return "Актёр";
      case "sounder":
        return "Композитор";
      case "dubler":
        return "Дублёр";
      default:
        return cat;
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts2${cat2}`);
        setPosts2(res.data);
      }
      catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat2]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }

  return (
    <div className='home2'>
      <div className="posts2">
        {posts2.map((post2) => (
          <div className="post2" key={post2.id}>
            <Link className='link' to={`/post2/${post2.id}`}>
              <div className="img2">
                <img src={`../upload/${post2.img}`} alt="" />
                <div className="bg">
                </div>
              </div>
              <div className="content2">
                <div className="name">
                  <br></br>
                  <h1>{post2.name}</h1>
                </div>
                <div className="title">
                  <p>{getText("Возраст " + post2.age + " ")}</p>
                  <p>{getText(getCatTranslation(post2.cat2))}</p>
                </div>
                </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home2
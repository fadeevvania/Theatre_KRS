import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Menu = ({ cat }) => {
  const [randomPosts, setRandomPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts?cat=${cat}`);
        // Получаем случайные элементы из полученных данных
        const shuffledPosts = res.data.sort(() => 0.5 - Math.random());
        const selectedPosts = shuffledPosts.slice(0, 4);
        setRandomPosts(selectedPosts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className='menu'>
      <h1>Рекомендуем посмотреть</h1>
      {randomPosts.map(post => (
        <div className="post" key={post.id}>
          <img src={`../upload/${post.img}`} alt="" />
          <Link className='link' to={`/post/${post.id}`}>
            <h1>{post.title}</h1>
            <button>Read More</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;

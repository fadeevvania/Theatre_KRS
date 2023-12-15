import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Menu = ({cat}) => {

  const[posts,setPosts] = useState([])


  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const res = await axios.get(`/posts/?cat${cat}`);
        setPosts(res.data);
      }
      catch(err){
        console.log(err);
      }
    };
    fetchData();
  },[cat]);

    // const posts =[
    //     {
    //       id: 1,
    //       title:"Спектакль Ван гог",
    //       desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //       img:"https://sun1.is74.userapi.com/impg/MDMMSiWiJCWf7Uy8IAk0MOT0d4yy9AVowCq79A/WfJ9TsnQg2g.jpg?size=1280x851&quality=96&sign=7b85dc37a4651d043587f2ffa975cb51&type=album"
    //     },
    //     {
    //       id: 2,
    //       title:"Спектакль Маленький принц",
    //       desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //       img:"https://sun9-53.userapi.com/impg/K7iLslbYgl3ca-hGwfK7RCEPCnfFnCCe5pMOJg/0Y2xzxLzwE4.jpg?size=810x1080&quality=95&sign=abfb536e4e8c2df5f3ff72e48f745f2a&type=album"
    //     },
    //     {
    //       id: 3,
    //       title:"Ванечка Фадеев",
    //       desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    //       img:"https://sun1.is74.userapi.com/impg/MDMMSiWiJCWf7Uy8IAk0MOT0d4yy9AVowCq79A/WfJ9TsnQg2g.jpg?size=1280x851&quality=96&sign=7b85dc37a4651d043587f2ffa975cb51&type=album"
    //     },
    //     {
    //       id: 4,
    //       title:"Ванечка Фадеев",
    //       desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit ",
    //       img:"https://sun1.is74.userapi.com/impg/MDMMSiWiJCWf7Uy8IAk0MOT0d4yy9AVowCq79A/WfJ9TsnQg2g.jpg?size=1280x851&quality=96&sign=7b85dc37a4651d043587f2ffa975cb51&type=album"
    //     },
    //   ];

  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map(post=>(
            <div className="post"key={post.id}>
                <img src={`../upload/${post.img}`} alt="" />
                <h2>{post.title}</h2>
                <button>Read More</button>
            </div>
        ))}
    </div>
  )
}

export default Menu
import { db } from "../db.js"
import jwt from "jsonwebtoken";

export const getPosts2 = (req, res) => {
    const q = req.query.cat2
        ? "SELECT * FROM posts2 WHERE cat2=?"
        : "SELECT*FROM posts2";

    db.query(q, [req.query.cat2], (err, data) => {
        if (err) return res.status(500).send(err)

        return res.status(200).json(data);
    });
};

export const getPost2 = (req, res) => {
    const q = "SELECT p.id, `username`,`name`,`age`,`exp`,`workplace`,`country`,`desc`, p.img, u.img AS userImg,`cat2`,`date` FROM users u JOIN posts2 p ON u.id=p.uid WHERE p.id = ?"

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    });
};

export const addPost2 = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      if (userInfo.role === "user") {
        return res.status(403).json("You don't have permission to add a post!");
      }
      const q =
        "INSERT INTO posts2(`name`, `age`, `img`, `cat2`, `exp`,`workplace`,`country`, `date`,`desc`,`uid`) VALUES (?)";
  
      const values = [
        req.body.name,
        req.body.age,
        req.body.img,
        req.body.cat2,
        req.body.exp,
        req.body.workplace,
        req.body.country,
        req.body.date,
        req.body.desc,
        userInfo.id,
      ];
  
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created.");
      });
    });
  };
export const deletePost2 = (req, res) => {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json("Not authenticated!")

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!")
          if (userInfo.role === "user") {
            return res.status(403).json("You don't have permission to delete a post!");
          }
        const post2Id = req.params.id;
        const q = "DELETE FROM posts2 WHERE `id` = ? AND `uid`= ?";

        db.query(q, [post2Id, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your post!");

            return res.json("Post has been deleted!");
        });
    });
};
export const updatePost2 = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
      if (userInfo.role === "user") {
        return res.status(403).json("You don't have permission to update a post!");
      }
      const post2Id = req.params.id;
      const q =
        "UPDATE posts2 SET `name`=?,`age`=?,`img`=?,`cat2`=?, `exp`=?,`workplace`=?,`country`=?,`desc`=? WHERE `id` = ? AND `uid` = ?";
  
      const values = [req.body.name, req.body.age, req.body.img, req.body.cat2,req.body.exp,req.body.workplace,req.body.country,req.body.desc];
  
      db.query(q, [...values, post2Id, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated.");
      });
    });
  };
import { db } from "../db.js"
import jwt from "jsonwebtoken";

export const addToBusket = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated!");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid!");
  
      const q = "INSERT INTO busket (post_id, uid) VALUES (?, ?)";
      const values = [req.body.post_id, userInfo.id];
  
      db.query(q, values, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been added to the cart.");
      });
    });
  };
  
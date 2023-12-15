import express from "express";
import { addPost2, deletePost2, getPost2, getPosts2, updatePost2 } from "../controllers/post2.js";

const router = express.Router()

router.get("/", getPosts2)
router.get("/:id", getPost2)
router.post("/", addPost2 )
router.delete("/:id", deletePost2)
router.put("/:id",updatePost2)

export default router
import express from "express";
import { addToBusket, } from "../controllers/busket.js";

const router = express.Router()

// router.get("/", getBusket)
router.post("/", addToBusket )


export default router
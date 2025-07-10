import express from "express";
import { isAuth } from "../middlewares/isAuth";
import { createNewChat, getAllChats, getMessagesByChat, sendMessage } from "../controllers/chat";
import { upload } from "../middlewares/multer";

const router = express.Router();

router.post("/chat/new", isAuth, createNewChat);
router.get("/chat/all", isAuth, getAllChats);
router.post("/message", isAuth, upload.single("image"), sendMessage);
router.get("/message/:chatId",isAuth,getMessagesByChat)

export default router;

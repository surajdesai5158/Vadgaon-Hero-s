import express from 'express';
import {  approveUser, deleteUser, getAllUsers, getUserProfile, loginUser, registerUser, updateProfile } from '../controllers/UserController.js';
import contactUser, { deleteMessage, getAllContacts, replyToContact } from '../controllers/ContactController.js';


const UserRouter = express.Router();

UserRouter.post("/register",registerUser);
UserRouter.post("/login",loginUser);
UserRouter.post("/contact",contactUser);
UserRouter.get("/users", getAllUsers);
UserRouter.put("/approve/:id", approveUser);
UserRouter.delete("/delete/:id", deleteUser);

UserRouter.get("/all", getAllContacts);
UserRouter.put("/reply/:id", replyToContact);
UserRouter.delete("/message/delete/:id", deleteMessage);

UserRouter.get('/profile', getUserProfile); 
UserRouter.put('/profile', updateProfile); 

export default UserRouter;
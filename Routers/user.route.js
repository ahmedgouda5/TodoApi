import express from 'express';

import { Router } from 'express';

import { GetAllUsers, CreateUser, LoginUser } from '../controllers/user.controller.js';
import verifyToken from '../middlewares/varefiyToken.js';

const userrouter = Router();

// GET all users
userrouter.get('/',verifyToken, GetAllUsers);
// POST create new user
userrouter.post('/register', CreateUser);
// login user
userrouter.post('/login', LoginUser);

export default userrouter;
import express from 'express';

const Router=express.Router();


import * as userController from '../controllers/userController.ts';

Router.post('/register', userController.register);
Router.post('/login', userController.login);
Router.post('/refresh-token',userController.refreshToken);

export default Router;



// userRoutes.ts
// index.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { mongoConnect } from './config/mongoConnect.ts'; 

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json());

import { authMiddleware } from './middleware/authMiddleware.ts';
import userRoutes from './routes/user.routes.ts';

// Connect to MongoDB
mongoConnect();

// checking application 

app.use('/api/users',userRoutes);

// const authMiddleware=(req:Request,res:Response,next:NextFunction)=>
//     { 
//     if(req.header('Auth'))
//       { next(); }
//     else
//       { res.status(400).json({message:"not valid request"})} 
//     };

app.get('/',authMiddleware,(req: Request, res: Response) => {
    res.status(200).json({ data: 'working' });
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

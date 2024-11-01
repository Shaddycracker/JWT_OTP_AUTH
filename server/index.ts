// index.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { mongoConnect } from './config/mongoConnect.ts'; 


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());



import userRoutes from './routes/user.routes.ts';

// Connect to MongoDB
mongoConnect();

// checking application 
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({ data: 'working' });
});

app.use('/api/users',userRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

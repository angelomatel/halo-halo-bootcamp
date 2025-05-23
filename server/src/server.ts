import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { configureRoutes } from './routing/routes';
import mongoose from 'mongoose';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
configureRoutes(app);

const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

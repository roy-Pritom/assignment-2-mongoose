import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './modules/user/user.route';
const app:Application=express();


// parser
app.use(express.json());
app.use(cors());


// call userRoutes
app.use('/',userRoutes)


app.get('/',(req:Request,res:Response)=>{
    res.send("Hello user!");
})


export default app;
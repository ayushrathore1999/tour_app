import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import UserRouter from "./routes/user.js"

const app = express();
const port = 5000;

app.use(morgan("dev"));
app.use(express.json({limit: "30mb", extended: true}));
app.use(express.urlencoded({limit: "30mb", extended: true}));
app.use(cors())

app.use("/user", UserRouter);

const MONGO_URL = `mongodb+srv://Ayush:34t9L1ABCUc6R6BI@cluster0.zyne0.mongodb.net/tourDb?retryWrites=true&w=majority`

mongoose.connect(MONGO_URL).then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    })
}).catch((err) => console.log(`error while connecting to db and ${err}`))






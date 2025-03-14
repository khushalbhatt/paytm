import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { userModel } from './root/db.js';

import router from './routes/index.js';
import accrouter from './routes/account.js';
const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api/v1',router);
app.use('api2/v2',accrouter);

app.get("/", (req,res) => {
    res.send("Hello World");
}); 


app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
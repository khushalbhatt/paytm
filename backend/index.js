import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { userModel } from './root/db.js';
const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req,res) => {
    res.send("Hello World");
});

app.post('/signup',async (req,res)=>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    
    const abc = await userModel.findOne({firstname: firstname, lastname: lastname});
    if(abc){
        res.status(400).send("User already exists");
        return;
    }
    await userModel.create({
        firstname: firstname,
        lastname: lastname,
        password: password,
    })
    res.status(201).send("User Created");
})

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
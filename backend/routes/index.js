import express from 'express';
import { userModel } from '../root/db.js';

const router = express.Router();

router.post('/signup',async (req,res)=>{
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

export default router;
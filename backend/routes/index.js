import express from 'express';
import { userModel,accountModel } from '../root/db.js';
import jwt from 'jsonwebtoken';
import zod from 'zod';
import JWT_Secret from '../config.js';
import { verifyToken } from '../middlewares/index.js';

const router = express.Router();

const userSchema = zod.object({
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string(),
    username: zod.string(),
});

router.post('/signup',async (req,res)=>{
    const body = req.body;;
    const Success = userSchema.safeParse(body);
    console.log(body);
    if(!Success){
        res.status(400).send("Invalid Body");
        return;
    }
    
    const existingUser = await userModel.findOne({username: body.username});
    if(existingUser){
        res.status(400).send("User already exists");
        return;
    }
    const dbUser = await userModel.create({
        firstname: body.firstname,
        lastname: body.lastname,
        password: body.password,
        username: body.username
    })
    console.log(dbUser);
    const accountModel = await accountModel.create({
        id: dbUser.id,
        balance: Math.floor(Math.random()*10000)
    })
    jwt.sign({userId:dbUser._id},JWT_Secret);
    res.status(201).send("User Created");
})

router.post('/login',async (req,res)=>{

    const username = req.body.username;
    const password = req.body.password;
    
    const user = await userModel.findOne({username: username});
    if(user){
        if(user.password === password){
            const token = jwt.sign({userId:user._id},JWT_Secret);
            console.log(token);
            res.status(200).send("User Authenticated and succesfully loggedin");
        }else{
            res.status(400).send("Invalid Credentials");
        }
    }else{
        res.status(400).send("Invalid Credentials");
    }
})


router.put('/update',verifyToken,async (req,res)=>{
    const body = req.body;
    console.log(req.userId);  
    await userModel.updateOne({_id:req.userId},body);
    res.status(200).send("User Updated");
});

router.get('/user',async (req,res)=>{
    filter = req.query.filter || '';
    const users = await userModel.find({
        $or: [{
                firstname:{
                    $regex: filter
                },
                lastname:{
                    $regex: filter
                }
            }]
    });
    res.status(200).send(users);
})

export default router;
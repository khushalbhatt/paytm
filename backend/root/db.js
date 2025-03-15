import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://Khushalbhatt:Khushal%40123@cluster0.ytwue.mongodb.net/paytm');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    password: String,
    username: String
})

const userModel = mongoose.model('users', userSchema);

export { userModel };
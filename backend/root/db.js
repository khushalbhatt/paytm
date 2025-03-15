import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://Khushalbhatt:Khushal%40123@cluster0.ytwue.mongodb.net/paytm',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
});

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    password: String,
    username: String
})

const accountSchema = new mongoose.Schema({
    id: String,
    balance: Number
})

const userModel = mongoose.model('users', userSchema);
const accountModel = mongoose.model('accounts', accountSchema);

export { userModel,accountModel };
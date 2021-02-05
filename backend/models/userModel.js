import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    first: {type: String,required: true},
    last: {type: String,required: true},
    bio: {type: String,required: true},
    email: {type: String,required: true,unique: true,dropDups: true},
    password: {type: String,required: true},
});
const userModel=mongoose.model('User',userSchema);
export default userModel;
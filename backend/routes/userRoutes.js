import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../util';

const router=express.Router();

router.put("/:id",isAuth,async(req,res)=>{
    const userId=req.params.id;
    const user=await User.findById(userId);
    if(user){
        user.first=req.body.first || user.first;
        user.last=req.body.last || user.last;
        user.bio=req.body.bio || user.bio;
        user.email=req.body.email || user.email;
        user.password=req.body.password || user.password;
        const updatedUser = await user.save();
        res.send({
            _id: updatedUser.id,
            first: updatedUser.first,
            last: updatedUser.last,
            bio: updatedUser.bio,
            email: updatedUser.email,
            token: getToken(updatedUser)
        })
    }else{
        res.status(404).send({msg: 'User Not Found'});
    }
});
router.post("/signin",async(req,res)=>{
    const signinUser=await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if(signinUser)
    {
        res.send({
            _id: signinUser.id,
            first: signinUser.first,
            last: signinUser.last,
            bio: signinUser.bio,
            email: signinUser.email,
            token: getToken(signinUser)
        })
    }
    else
    {
        res.status(401).send({message: "Invalid email or Password"});
    }
});
router.post("/register",async(req,res)=>{
    const user=new User({
        first: req.body.first,
        last: req.body.last,
        bio: req.body.bio,
        email: req.body.email,
        password: req.body.password,
    });
    const newUser=await user.save();
    if(newUser)
    {
        res.send({
            _id: newUser.id,
            first: newUser.first,
            last: newUser.last,
            bio: newUser.bio,
            email: newUser.email,
            token: getToken(newUser),
        });
    }
    
    else
    {
        res.status(401).send({message: "Invalid user data"});
    }
})


router.get("/register",async(req,res)=>{
    const products=await User.find();
    res.send(products);
})
router.get("/",async(req,res)=>{
    const searchKeyword=req.query.searchKeyword?{
      first: {
        $regex: req.query.searchKeyword,
        $options: 'i',
      },
      last: {
        $regex: req.query.searchKeyword,
        $options: 'i',
      },
    }:{};
    const user=await User.find({...searchKeyword});     
    res.send(user);
});
//router.get("/createadmin",async(req,res)=>{
  //  const products=await User.find();
   // res.send(products);
//})
export default router;

const bcryptjs = require('bcryptjs');
const userModel = require('../model/userModel');

const register =async (req,resp) =>{
  try {
    const {name,email, password} = req.body
    const user = await userModel.findOne({email});

    if(user){
        resp.json({message:"Email already registered"})
    } else {
        const hashPassword = await bcryptjs.hash(password,10)
        await userModel.create({name,email, password:hashPassword})
        resp.json({message:"User registered successfully..."})
    }
  } catch (error) {
    console.log(error);
  }
}

const login = async(req,resp) =>{
    try {
        const {email, password }= req.body
        const user = await userModel.findOne({email});
        console.log(user);
        if (user && await bcryptjs.compare(password, user.password)) {
            resp.json({message:"Login successful",user:{id:user._id,name:user.name,email:user.email}})
        } else {
            resp.json({message:"Invalid email or password"})
        }
    } catch (error) {
        console.log(error);
    }
}

const displayUsers = async(req,resp)=>{
    try {
        const result = await userModel.find().select("-password")
        resp.json(result)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {register, login, displayUsers}

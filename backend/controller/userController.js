
const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const userModel = require('../model/userModel');

const register =async (req,resp) =>{

  try {

    const {name,email,password} = req.body

    const user = await userModel.findOne({email});

    if(user){

        return resp.json({message:"Email already registered"})

    } else {

        const hashPassword = await bcryptjs.hash(password,10)

        await userModel.create({
            name,
            email,
            password:hashPassword,
            role:"customer"
        })

        resp.json({message:"User registered successfully..."})

    }

  } catch (error) {

    console.log(error);

    resp.status(500).json({message:"Registration failed"})

  }

}

const login = async(req,resp) =>{

    try {

        const {email,password} = req.body

        const user = await userModel.findOne({email});

        if (user && await bcryptjs.compare(password,user.password)) {

            const token = jwt.sign(
                {id:user._id,role:user.role},
                "inventory_secret_key",
                {expiresIn:"1d"}
            )

            resp.json({
                message:"Login successful",
                token,
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                }
            })

        } else {

            resp.json({message:"Invalid email or password"})

        }

    } catch (error) {

        console.log(error);

        resp.status(500).json({message:"Login failed"})

    }

}

const displayUsers = async(req,resp)=>{

    try {

        const result = await userModel.find().select("-password")

        resp.json(result)

    } catch (error) {

        console.log(error);

        resp.status(500).json({message:"Unable to display users"})

    }

}

module.exports = {register,login,displayUsers}

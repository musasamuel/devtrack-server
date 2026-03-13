import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken"

export const register = async (req: Request, res: Response) => {
   try { 
    const { email, password, name} = req.body;
    if ( !email || !password){
        return res.status(400).json({message: "Email and Password are required" });
    }
    const existingUser = await prisma.user.findUnique({
        where: {email}
    })
    if (existingUser){
        return res.status(400).json({message: "User already exist"});
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashPassword,
            name: name
        }
    })
   return res.status(201).json({
    message: "User created successfully",
    user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
    }
   })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req: Request, res: Response) => {
    try{
      const { email, password} = req.body
      if (!email || !password){
        return res.status(400).json({message: "Email and Password required"})
      };
      const existingUser = await prisma.user.findUnique({
        where: {email}
    })
      if(!existingUser){
        return res.status(400).json({message: "Invalid credentials"});
      }
    const matchedPassword = await bcrypt.compare(password, existingUser.password);
      if(!matchedPassword){
        return res.status(400).json({message: "Invalid password"})
      }
      const token = jwt.sign(
        {userId: existingUser.id},
        process.env.JWT_SECRET as string,
        {expiresIn: "1d"}
      );
      return res.status(200).json({
        message: "Login Successful",
        token,
        user: {
            id: existingUser.id,
            email: existingUser.email
        }
      })
    } catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"})
    };
};
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

export const register = async (req: Request, res: Response) => {
   try { 
    const { email, password} = req.body;
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
            password: hashPassword
        }
    })
   return res.status(201).json({
    message: "User created successfully",
    user: {
        id: newUser.id,
        email: newUser.email
    }
   })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
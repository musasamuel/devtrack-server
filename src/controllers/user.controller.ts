import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const user = async (req: Request, res: Response) => {
    try {
        const  userId  = req.userId
        const existingUser = await prisma.user.findUnique({
        where: {
            id: Number(userId)
        }
        })
         if(!existingUser){
            return res.status(404).json({message: "user info without password"})
         }
            return res.status(200).json({
                 id: existingUser.id,
                 email: existingUser.email,
                createdAt: existingUser.createdAt
            })
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error"})
    }
}
import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const addMember = async (req: Request, res: Response) => {
    try{
        const { userId, role } = req.body;
        const { id } = req.params
        const projectMember = await prisma.projectMember.create({
        data: {
            userId: Number(userId),
            role,
            projectId: Number(id)
        }
    })
    return res.status(201).json({
      message: "User created successfully",
      user: {
        userId: projectMember.userId,
        role: projectMember.role,
        projectId: projectMember.projectId
      }
     })
    }catch (err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error"})
    }
}
export const getMember = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
         const allMember = await prisma.projectMember.findMany({
            where: { projectId: Number(id) },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        }) 
        return res.status(200).json(allMember);
    }catch (err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error"})
    }
}
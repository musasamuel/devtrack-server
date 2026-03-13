import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const addActivity = async (req: Request, res: Response) => {
    try{
        const { action } = req.body
        const { id } = req.params
        const userId  = req.userId
        const activityMember = await prisma.activity.create({
        data: {
            action,
            projectId: Number(id),
            userId: Number(userId),
        }
    })
    return res.status(201).json({
      message: "User created successfully",
      user: {
        action: activityMember.action,
        projectId: activityMember.projectId,
        userId: activityMember.userId,
      }
     })
    }catch (err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error"})
    }
}
export const getActivity = async (req: Request, res: Response) => {
    try{
        const { id } = req.params
         const allActivity = await prisma.activity.findMany({
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
        return res.status(200).json(allActivity);
    }catch (err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error"})
    }
}
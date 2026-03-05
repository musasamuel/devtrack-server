import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const project = async (req: Request, res: Response) => {
    try {
    const { name } = req.body;
    const userId = req.userId
    if (!name) {
        return res.status(400).json({ message: "Project name is required" });
    }
    const newProject = await prisma.project.create({
        data:{
            name,
            userId: Number(userId)
        }
    })
    return res.status(201).json(newProject)
   }catch (error) {
    res.status(500).json({ message: "Error creating project" });
  }
} 

export const projects = async (req: Request, res: Response) => {
    try{

        const allProject = await prisma.project.findMany({
            where: {
                userId: Number(req.userId)
            }
        })
        return res.status(200).json(allProject);
    }catch (error){
        res.status(500).json({message: "Error in returning project"})
    }
}
export const singleProject = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const userId = req.userId
        const aProject = await prisma.project.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                tasks: true
            }
        })
        if(!aProject){
            return res.status(404).json({message: "Not found"})
        }
        return res.status(200).json(aProject)
    }catch (error){
        res.status(500).json({message: "Error in returning project"})
    }
}
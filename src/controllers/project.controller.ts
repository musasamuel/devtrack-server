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

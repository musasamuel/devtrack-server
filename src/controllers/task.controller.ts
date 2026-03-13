import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const task = async (req: Request, res: Response) => {
    try{
        const { title, projectId, dueDate, priority} = req.body;
        if (!title || !projectId){
            return res.status(400).json({message: "Not found"})
        }
        const newTask = await prisma.task.create({
            data: {
               title,
               projectId: Number(projectId),
               dueDate,
               priority,
            }
        })
        return res.status(200).json(newTask);
    }catch (error){
        res.status(500).json({message: "Error in creating task"})
    }
}
export const completeTask = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;
        const updateTask = await prisma.task.update({
            where: { id: Number(id) },
            data: { completed: true }
        })
        return res.status(200).json(updateTask)
    }catch (error){
        res.status(500).json({message: "Error in creating task"})
    }
}
import { Request, Response, NextFunction } from "express";
import jwt  from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) =>{
  try{
    const token = req.headers["authorization"]?.split(" ")[1];
    if(!token){
        return res.status(401).json({ message: "No token provided!" });
    }
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET as string) as {userId: string};
        req.userId = decode.userId;
        next();
    }catch(err){
        console.log(err);
        return res.status(401).json({ message: "No token provided!" });
    }
  }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"})
    };
};
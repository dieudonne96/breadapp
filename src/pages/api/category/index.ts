import { Prisma, Category } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { IError } from "../../../types/response";

export default async (req: NextApiRequest, res: NextApiResponse<Category | Category[] | IError>) => {
    try {
        if(req.method === "GET"){
            const categories = await prisma.category.findMany({
                include: {
                    business: true,
                }
            });
            res.status(200).json(categories);
        }else if(req.method === "POST"){
            const category = await prisma.category.create({
                data: req.body,
            })
            res.status(201).json(category);
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ message : error.message })
        }else{
            res.status(500).json({ message : 'Opps something went wrong...' + JSON.stringify(error) })
        } 
    }
};


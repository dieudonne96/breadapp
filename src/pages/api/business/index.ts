import type { Business } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import type { IError } from "../../../types/response";

export default async (req: NextApiRequest, res: NextApiResponse<Business | Business[] | IError>) => {
    try {
        if(req.method === "GET"){
            const businesses = await prisma.business.findMany({
                include: {
                    category: true,
                }
            }) as Business[];
            res.status(200).json(businesses);
        }else if(req.method === "POST"){
            const business = await prisma.business.create({
                data: req.body,
            }) as Business;
            res.status(201).json(business);
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ message : error.message })
        }else{
            res.status(500).json({ message : 'Opps something went wrong...' + JSON.stringify(error) })
        } 
    }
};


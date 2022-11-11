import { Prisma, Business } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { IError } from "../../../types/response";

export default async (req: NextApiRequest, res: NextApiResponse<Business | IError>) => {
    try {
        if(req.method === "PUT"){
            const id = req.query.id as string;
            const business = await prisma.business.update({
                where: { id: id },
                data: req.body,
            });
            res.status(200).json(business);
        }else {
            res.status(400).json({ message : 'Wrong method...' });
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ message : error.message })
        }else{
            res.status(500).json({ message : 'Opps something went wrong...' + JSON.stringify(error) })
        } 
    }
};


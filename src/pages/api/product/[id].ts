import type { Product } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = req.query.id as string
        const product = await prisma.product.findUnique({
            where: { id },
            include:{
                business : {
                    include:{
                        category: true
                    }
                }
            }
        }) as Product;
        res.status(200).json(product)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ message : error.message })
        }else{
            res.status(500).json({ message : 'Opps something went wrong...' + JSON.stringify(error) })
        } 
    }
};


import { Prisma } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import { Product } from "@prisma/client";

export default async (req: NextApiRequest, res: NextApiResponse<Product[] | Product | { message : string }>) => {
    try {
        if(req.method === "GET"){
            const products = await prisma.product.findMany() as Product[];
            res.status(200).json(products);
        }else if(req.method === "POST"){
            const product = await prisma.product.create({
                data: req.body,
            }) as Product;
            res.status(201).json(product);
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ message : error.message })
        }else{
            res.status(500).json({ message : 'Opps something went wrong...' + JSON.stringify(error) })
        } 
    }
};


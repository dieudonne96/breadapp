import { Prisma } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = req.query.id as string
        if(req.method === "PUT"){
            const user = await prisma.user.update({
                where: { id },
                data: req.body
            })
            res.status(200).json(user)
        }else{
            const user = await prisma.user.findUnique({
                where: { id },
                include:{
                    business : {
                        include:{
                            category: true
                        }
                    }
                }
            })
            res.status(200).json(user)
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ message : error.message })
        }else{
            res.status(500).json({ message : 'Opps something went wrong...' + JSON.stringify(error) })
        } 
    }
};


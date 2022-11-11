import { Prisma } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";
import * as argon2 from "argon2";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if(req.method === "GET"){
            const users = await prisma.user.findMany({
                include:{
                    business : {
                        include:{
                            category: true
                        }
                    }
                }
            });
            res.status(200).json(users);
        }else if(req.method === "POST"){
            const { name, email, password, businessId } = req.body;
            const hashedPassword = await argon2.hash(password);
            const user = await prisma.user.create({
                data: { name, email, businessId, auth : { create : { password : hashedPassword } } },
            });
            res.status(201).json(user);
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ message : error.message })
        }else{
            res.status(500).json({ message : 'Opps something went wrong...' + JSON.stringify(error) })
        } 
    }
};


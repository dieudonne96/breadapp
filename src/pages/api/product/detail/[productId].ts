import { Prisma } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { getContract } from "../../../../service/contract";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const productId = req.query.productId as string;
        if(req.method === "GET"){
            const contract = await getContract();
            const product = await contract.getProductDetail(productId);
            const structuredData = {
                items : product.items.map((item : any) => JSON.parse(item.replace(/'/g, '"'))),
                timestamp: new Date(product.timestamp.toNumber() * 1000).toLocaleString(),
                productId: product.productId,
                sender: product.sender,
            }
            res.status(200).json(structuredData);
        }else{
            res.status(405).json({ message : 'Method not allowed' })
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            res.status(400).json({ message : error.message })
        }else{
            res.status(500).json({ message : 'Opps something went wrong...' + JSON.stringify(error) })
        } 
    }
};

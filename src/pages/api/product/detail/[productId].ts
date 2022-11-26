import { Prisma } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { getContract } from "../../../../service/contract";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const productId = req.query.productId as string;
        const contract = await getContract();
        if(req.method === "GET"){
            const product = await contract.getProductDetail(productId);
            const structuredData = {
                items : product.items.map((item : any) => JSON.parse(item.replace(/'/g, '"'))),
                timestamp: new Date(product.timestamp.toNumber() * 1000).toLocaleString(),
                productId: product.productId,
                sender: product.sender,
            }
            return res.status(200).json(structuredData);
        }if(req.method === "PUT"){
            const { items } = req.body;
            const product = await contract.setProductDetail(items,productId,{gasLimit: 1000000});
            return res.status(200).json({ message: "Product updated successfully" });
        }
        else{
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


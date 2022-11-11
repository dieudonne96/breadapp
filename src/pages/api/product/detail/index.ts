import { Prisma } from "@prisma/client";
import { type NextApiRequest, type NextApiResponse } from "next";
import { getContract } from "../../../../service/contract";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if(req.method === "GET"){
            const contract = await getContract();
            const products = await contract.getAllProductDetails();
            const dataList = products.map((product : any) => {
                return ({
                    items : product.items.map((item : any) => JSON.parse(item.replace(/'/g, '"'))),
                    timestamp: new Date(product.timestamp.toNumber() * 1000).toLocaleString(),
                    productId: product.productId,
                    sender: product.sender,
                })
            })
            res.status(200).json(dataList);
        }else if(req.method === "POST"){
            const { productId, items } = req.body;
            const contract = await getContract();
            const product = await contract.AddToBlockchain(items, productId,{gasLimit: 1000000});
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


import { ethers } from "ethers";
import { contractABI } from "../utils/constants";

export const getContract = async () : Promise<ethers.Contract>  => {

    const providers = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);
    const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY!);
    // connect the wallet to the provider
    const new_signer = wallet.connect(providers);
    const productContract = new ethers.Contract(process.env.CONTRACT_ADDRESS_KEY!, contractABI, new_signer)
    return productContract;
}
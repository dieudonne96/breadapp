export interface IBlockchain {
    items:     Item[];
    timestamp: string;
    productId: string;
    sender:    string;
}

export interface Item {
    tilte: string;
    value: number | string;
}
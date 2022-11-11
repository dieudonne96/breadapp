import type { Product } from '@prisma/client'
import useSWR, { mutate } from 'swr'
import type { IBlockchain } from '../types/product'

export const fetcher = (url : any) => fetch(url).then(r => r.json())

export const useProducts = () => {
    return useSWR(`/api/product`, fetcher)
}

export const useProductByBusiness = (id : string | null = null) => {
    return useSWR<Product[]>([id ? `/api/product/business/${id}` : null], fetcher)
}

export const useProduct = (id : string | null = null) => {
    return useSWR<Product>([id ? `/api/product/${id}` : null], fetcher)
}

export const useProductBlockchain = (id : string | null = null) => {
    return useSWR<IBlockchain>([id ? `/api/product/detail/${id}` : null], fetcher)
}

export const useMuateProducts = (data : any) => {
    return mutate(`/api/product`, data)
}

export const createProduct = (data : any) => {
    return fetch(`/api/product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
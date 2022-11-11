import { Product } from '@prisma/client'
import useSWR, { mutate, useSWRConfig } from 'swr'

export const fetcher = (url : any) => fetch(url).then(r => r.json())

export const useProducts = () => {
    return useSWR(`/api/product`, fetcher)
}

export const useProduct = (id : string | null = null) => {
    return useSWR<Product>([id ? `/api/product/${id}` : null], fetcher)
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
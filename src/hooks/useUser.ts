import useSWR from 'swr'
import { IUser } from '../types/user'
import { fetcher } from './useProduct'

export const useUser = (userId : string | null = null) => {
    return useSWR<IUser, any>(userId ? `/api/user/${userId}` : null, fetcher)
}
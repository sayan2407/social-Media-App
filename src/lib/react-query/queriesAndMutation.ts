import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import { createUser, signInAccount, signOutAccount } from '../appwrite/api'
import { INewUser } from '@/types'

  export const useCreateUseraccountMutation = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUser(user)
    })
  }

  export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string,
            password: string
        }) => signInAccount(user)
    })
  }

  export const useSignOutAccount = () => {
    return useMutation({
      mutationFn: signOutAccount,
    });
  };
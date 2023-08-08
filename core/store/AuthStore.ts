import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import _ from 'lodash'

interface AuthStore {
    user: any,
    setUser: (data: any) => void
    isAuth: boolean,
    setIsAuth: (data: boolean) => void

}

export const useAuthStore = create<AuthStore>()(
    (set) => ({
        user: null,
        setUser: (data: any) => set((state) => ({
            user: data
        })),
        isAuth: false,
        setIsAuth: (data: boolean) => set((state) => ({
            isAuth: data
        }))

    })
)
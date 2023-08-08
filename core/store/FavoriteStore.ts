import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import _ from 'lodash'

interface FavoriteStore {
    favorites: any[],
    setFavorite: (data: any) => void
    removeFavorite: (data: string) => void
    
}

export const useFavoriteStore = create<FavoriteStore>()(
    (set) => ({
        favorites: [],
        setFavorite: (data: any) => set((state) => ({
            favorites: [
                ...state.favorites,
                data
            ]
        })),
        removeFavorite: (data: string) => set((state) => ({
            favorites: state.favorites.filter((item: string) => item?.product?.id !== data)
        }))
    })
)
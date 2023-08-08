import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import _ from 'lodash'

interface ShippingAddrStore {
    shippings: object[],
    setShippingAddr: (data: object) => void
    removeFavorite: (id: string) => void
    defaultShipping: string
    setDefaultShipping: (id: string) => void
}

export const useShippingAddrStore = create<ShippingAddrStore>()(
    (set) => ({
        shippings: [],
        setShippingAddr: (data: object) => set((state) => ({
            shippings: [
                ...state.shippings,
                data
            ]
        })),
        removeFavorite: (id: string) => set((state) => ({
            shippings: state.shippings.filter((item: any) => item?.id !== id)
        })),
        defaultShipping: '',
        setDefaultShipping: (id: string) => set((state) => ({
            defaultShipping: id
        }))
    })
)
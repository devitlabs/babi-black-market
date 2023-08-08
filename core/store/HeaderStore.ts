import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import _ from 'lodash'

export type FilterType = "brand" | "category" | "price" | "color" | "size" | "discount" | "rating" | "new" | "bestseller" | "sale" | "none"
interface HeaderState {
    isShoppingBagOpen: boolean
    isFilterOpen: boolean
    filterDataSelected: object
    filterData: FilterType
    SetShoppingBage: (open: boolean) => void
    SetFilterPopup: (open: boolean) => void
    SetFilterData: (data: FilterType) => void
    setFilterDataSelected: (data: string, type: FilterType) => void
    removeFilterDataSelected: (data: string, type: FilterType) => void
}

export const useShoppingBagStateStore = create<HeaderState>()(
    (set) => ({
        isShoppingBagOpen: false,
        SetShoppingBage: (open) => set((state) => ({ isShoppingBagOpen: open })),
        isFilterOpen: false,
        SetFilterPopup: (open) => set((state) => ({ isFilterOpen: open })),
        filterData: "none",
        SetFilterData: (data) => set((state) => ({ filterData: data })),
        filterDataSelected: {},
        setFilterDataSelected: (data, type) => set((state) => ({
            filterDataSelected: {
                ...state.filterDataSelected, [type]: [
                    ..._.get(state.filterDataSelected, type, []),
                    data
                ]
            }
        })),
        removeFilterDataSelected: (data, type) => set((state) => ({
            filterDataSelected: {
                ...state.filterDataSelected, [type]: _.get(state.filterDataSelected, type, []).filter((item: string) => item !== data)
            }
        }))
    })
)
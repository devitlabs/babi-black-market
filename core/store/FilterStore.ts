import { create } from 'zustand';

interface FilterStore {
    maxPrice: number,
    minPrice: number,
    search: string,
    subCategory: string,
    setSubCategory: (subCategory: string) => void,
    setMaxPrice: (maxPrice: number) => void,

    setMinPrice: (minPrice: number) => void,
    setSearch: (search: string) => void,
    save:string
    setSave: (save: string) => void

}

export const useFilterStore = create<FilterStore>()(
    (set) => ({
        maxPrice: 100,
        minPrice: 10,
        search: "",
        save:"",
        subCategory: "",
        setSubCategory: (subCategory: string) => set({ subCategory }),
        setMaxPrice: (maxPrice: number) => set({ maxPrice }),
        setMinPrice: (minPrice: number) => set({ minPrice }),
        setSearch: (search: string) => set({ search }),
        setSave: (save: string) => set({ save })

    })
)
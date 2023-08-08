import { create } from 'zustand';

interface ProductDescriptionStore {
    currentId: string | null,
    currentProductId : any,
    setCurrentId: (currentId: string | null) => void
    setCurrentProductId: (currentProductId: any) => void

}

export const useProductDescriptionStore = create<ProductDescriptionStore>()(
    (set) => ({
        currentId: null,
        currentProductId: null,
        setCurrentId: (currentId: string | null) => set({ currentId }),
        setCurrentProductId: (currentProductId: any) => set({ currentProductId })
    })
)
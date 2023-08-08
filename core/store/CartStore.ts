import { create } from 'zustand';

interface CartStore {
    uniqId: any,
    cartProcessing: boolean,
    cart : any,
    payementMethod: any,
    setPayementMethod: (payementMethod: any) => void,
    setCard: (cart: any) => void
    setCardProcessing: (cartProcessing: boolean) => void

}

export const useCartStore = create<CartStore>()(
    (set) => ({
        uniqId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        cart: null,
        payementMethod: null,
        setPayementMethod: (payementMethod: any) => set({ payementMethod }),
        cartProcessing: false,
        setCard: (cart: any) => set({ cart }),
        setCardProcessing: (cartProcessing: boolean) => set({ cartProcessing })
    })
)
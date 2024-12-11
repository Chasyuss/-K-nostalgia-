import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';


//결제 요청 정보에 필요한 값 전역 저장
//update: 24.11.20

type Products = {
  id: string;
  name: string;
  amount: number;
  quantity: number;
}[]
type Customer = {
  customerId: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: object;
}

type State = {
  orderName: string;
  totalAmount: number;
  products: Products;
  // customer: Customer;
}
type Actions = {
  setOrderName: (orderName: string) => void;
  setTotalAmount: (amount: number) => void;
  setProducts: (products: Products) => void;
  // setCustomer: (customer: Customer) => void;
  resetState: () => void;
}

const initialState : State = {
  orderName: '',
  totalAmount: 0,
  products:[{
    id: '',
    name: '',
    amount: 0,
    quantity: 0
  }],
  // customer:{
  //   customerId: '',
  //   fullName: '',
  //   phoneNumber: '',
  //   email: '',
  //   address:{}
  // }
}

export const usePaymentRequestStore = create<State & Actions>()(
  persist(
    (set) => ({
      ...initialState,
      setOrderName: (orderName) => set((state) => ({ ...state, orderName })),
      setTotalAmount: (amount) => set((state) => ({ ...state, totalAmount: amount })),
      setProducts: (products) => set((state) => ({ ...state, products })),
      resetState: () => set(initialState),
    }),
    {
      name: "payment-request-storage", 
      storage: createJSONStorage(()=>sessionStorage),
      //스토리지 비우기 : usePaymentRequestStore.persist.clearStorage()
    }
  )
);

  // setCustomer: (customer) => set((state) => ({ ...state, customer })),
import { create } from "zustand";

interface ProductItem{
  amount:number,
  id: string,
  name: string,
  orderNameArr: string[]
  quantity: number
}
export const usePaymentStore  = create((set)=>({
  product:[],
  // setProduct: (state)=>{}
}))


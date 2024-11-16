import { create } from "zustand";

interface ProductItem{
  amount:number,
  id: string,
  name: string,
  orderNameArr: string[]
  quantity: number
}
//이름 변경하셈
export const usePaymentStore  = create((set)=>({
  product:null, //객체로저장? 배열로 저장?
  // setProduct: (state)=>{}
}))


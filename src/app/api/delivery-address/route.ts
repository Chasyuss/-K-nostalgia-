import supabase from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async(request : NextRequest)=>{
  //  response 타입 {
  //     addressName: string; // 배송지명
  //     receiverName: string; // 수령인 이름
  //     phoneNumber: string; // 휴대폰 번호
  //     baseAddress: string; // 기본 주소
  //     detailAddress: string; // 상세 주소
  //     isDefaultAddress: boolean; // 기본 배송지 설정 여부
  //     id?: string; //유저 id
  //   };
  const response = await request.json();

  //id 선언 후 객체에서 제거
  const id = response.id
  delete response.id;

  const { error} = await supabase.from('users').update({address:response}).eq('id', id);

  if(error) {
    console.error(error);
    return NextResponse.json({
      status: error.code, 
      message: error.message
    })
  }
  return NextResponse.json({status: 200})
}
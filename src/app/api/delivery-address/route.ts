import supabase from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

const errorHandling = (error :any) =>{
  console.error(error);
  return NextResponse.json({
    status: error.code, 
    message: error.message
  })
}

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
  const {id, isDefaultAddress, ...rest} = response;

  //기존 값 가져오기
  const {data : prevDefaultAddress} = await supabase.from('users').select('defaultAddress').eq('id', id)
  const {data : prevAddresses} = await supabase.from('users').select('addresses').eq('id', id)

  //기본 배송지로 설정
  if(isDefaultAddress){
    //기존 값이 NULL이면 defaultAddress에 바로 추가
    if(prevDefaultAddress === null){
      const {error} = await supabase.from('users').update({defaultAddress : {...rest}}).eq('id', id)
      if(error){
        errorHandling(error)
      }
    }
    //기존 값이 null이 아니면 기존 기본 배송지를 addresses에 추가 후 
    //입력 값 defaultAddress에 추가
    if(prevDefaultAddress !== null){
      const {error} = await supabase
        .from('users')
        .update({
          addresses: prevAddresses !== null ? [...prevAddresses, {...prevDefaultAddress}]: [{...prevDefaultAddress}],
          defaultAddress: {...rest}
        })
        .eq('id', id)
      if(error){
        errorHandling(error)
      }
    }
  }
  //배송지 목록에 추가
  if(!isDefaultAddress){
    const {error} = await supabase
      .from('users')
      .update({
        addresses: prevAddresses !== null ? [...prevAddresses, {...rest}]: [{...rest}]
      })
      .eq('id', id)
      if(error){
        errorHandling(error)
      }
  }

  return NextResponse.json({status: 200})
}


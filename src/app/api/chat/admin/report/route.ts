import { Tables } from "@/types/supabase";
import supabase from "@/utils/supabase/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request:NextRequest) => {

    // report에 내용 넣어놓고 가져오기
    try{
        const { id }: { id: string; } = await request.json();
 
        const { data, error } = await supabase
        .from('')
        .select('*')
        .eq('id', id)

        if (error) {
            return NextResponse.json(error, {status: 400});
        }
    return NextResponse.json(data, {status: 200});
    } catch(error){
    return NextResponse.json(error, {status: 500});
    }
}
import Image from 'next/image';
import React from 'react';

const CustomerNoContext = () => {
  return (
    <div className="flex justify-center items-center flex-col mt-[234px]">
      <Image
        src="/image/StateSad.png"
        alt="우는 호랑이"
        width={114}
        height={97}
        className="w-[114px] h-[97px]"
      />
      <p className="text-[18px] text-label-assistive font-medium">
        등록되지 않았어요.
      </p>
    </div>
  );
};

export default CustomerNoContext;

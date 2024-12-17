//배송지 추가 페이지

//결제 진행 중에서 추가할 경우, 해당 페이지로 바로 이동되어야해서
//별도 페이지로 제작했습니다

'use client';

import InfoIcon from '@/components/icons/InfoIcon';
import { useState } from 'react';

const AddNewAddress = () => {
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  return (
    <>
      {/* 안내 메시지 */}
      <div className="w-full flex gap-1 items-center bg-[#F2F2F2] mt-16 px-4 py-3">
        <InfoIcon color="#959595" />
        <p className="text-xs text-gray-400 ">
          배송지에 따라 상품정보 및 배송유형이 달라질 수 있습니다.
        </p>
      </div>

      <main className="max-w-md mx-auto bg-normal p-4">
        {/* 배송지 입력 폼 */}
        <form>
          {/* 배송지명 */}
          <div className="mb-4">
            <label className="block text-[16px] font-medium text-gray-700">
              배송지명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="최대 10자 이내로 작성해 주세요"
              className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* 수령인 */}
          <div className="mb-4">
            <label className="block text-[16px] font-medium text-gray-700">
              수령인 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="최대 10자 이내로 작성해 주세요"
              className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* 휴대폰 번호 */}
          <div className="mb-4">
            <label className="block text-[16px]  font-medium text-gray-700">
              휴대폰 번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="010-0000-0000"
              className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* 주소 */}
          <div className="mb-4">
            <label className="block text-[16px]  font-medium text-gray-700">
              주소 <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="주소 찾기로 입력해 주세요"
                className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <button
                type="button"
                className="bg-[#A1734C] text-white px-4 rounded hover:bg-[#8E653A] transition"
              >
                주소 찾기
              </button>
            </div>
            <input
              type="text"
              placeholder="상세 주소를 입력해 주세요"
              className="w-full p-3 border rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* 기본 배송지 설정 */}
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="defaultAddress"
              checked={isDefaultAddress}
              onChange={() => setIsDefaultAddress(!isDefaultAddress)}
              className="w-5 h-5 rounded border-gray-300 text-[#A1734C] focus:ring-[#A1734C]"
            />
            <label
              htmlFor="defaultAddress"
              className="ml-2 text-gray-700 text-sm"
            >
              기본 배송지로 설정
            </label>
          </div>

          {/* 등록 버튼 */}
          <button
            type="submit"
            className="w-full py-3 bg-[#A1734C] text-white font-bold rounded hover:bg-[#8E653A] transition"
          >
            등록하기
          </button>
        </form>
      </main>
    </>
  );
};

export default AddNewAddress;

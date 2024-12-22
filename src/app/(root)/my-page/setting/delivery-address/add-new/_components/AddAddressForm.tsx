// 배송지 입력 폼(input + button)

// react-daum-postcode 사용했음
// update: 24.12.22

'use client';

import { useState } from 'react';

import { useUser } from '@/hooks/useUser';
import { formatPhoneNumber } from '@/utils/format';
import { validateName, validatePhoneNumber } from '@/utils/validate';

import { toast } from '@/components/ui/use-toast';
import { useDaumPostcodePopup } from 'react-daum-postcode';

const AddAddressForm = () => {
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [baseAddressWithZoneCode, setBaseAddressWithZoneCode] = useState('');

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: boolean;
  }>({});

  //다음에도 사용 체크박스용 boolean state
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);

  const { data } = useUser();
  const userId = data?.id;

  //input 유효성 검사
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'addressName' || name === 'receiverName') {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: !validateName(value)
      }));
    }
    if (name === 'phoneNumber') {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: !validatePhoneNumber(value)
      }));
    }
    if (name === 'baseAddress') {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: baseAddressWithZoneCode !== ''
      }));
    }
  };

  //휴대폰 번호 포맷팅 -> useState에 set
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setFormattedPhoneNumber(
      //010-????-???? 형식으로 포맷팅
      formatPhoneNumber({
        value: currentValue,
        prevValue: formattedPhoneNumber
      })
    );
  };

  //주소지 검색 - react-daum-postcode
  const open = useDaumPostcodePopup(
    'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  );
  const daumPostcodeCompleteHandler = (data: any) => {
    const address = data.address;
    const zoneCode = data.zonecode;
    setBaseAddressWithZoneCode(`${address} (${zoneCode})`);
  };
  const daumPostcodeClickHandler = () => {
    open({ onComplete: daumPostcodeCompleteHandler });
  };

  //supabase 'users' Table update
  const postDeliveryAddress = async (address: Object) => {
    await fetch('/api/delivery-address', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...address, id: userId })
    });
  };

  //TODO throttling용 함수 별도 제작 후 handleSubmit에 적용
  //배송지 등록
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields = {
      addressName: '배송지명',
      receiverName: '수령인',
      phoneNumber: '휴대폰 번호',
      baseAddress: '주소'
    };
    const missingFields = Object.keys(requiredFields).filter(
      (key) => !e.currentTarget[key]?.value || validationErrors[key]
    );

    if (missingFields.length > 0) {
      return toast({
        description: `모든 정보를 바르게 입력해주세요`
      });
    }

    const deliveryFormData = new FormData(e.currentTarget);

    const addressName = deliveryFormData.get('addressName');
    const receiverName = deliveryFormData.get('receiverName');
    const phoneNumberForSubmit = formattedPhoneNumber.replace(/[^\d]/g, '');
    const detailAddress = deliveryFormData.get('detailAddress');

    const addressForRequest = {
      addressName,
      receiverName,
      phoneNumber: phoneNumberForSubmit,
      baseAddress: baseAddressWithZoneCode,
      detailAddress,
      isDefaultAddress
    };

    try {
      postDeliveryAddress(addressForRequest);
    } catch (error) {
      console.error('배송지 업데이트 중 에러');
    }

    //모든 input + validationErrors 초기화
    setFormattedPhoneNumber('');
    setBaseAddressWithZoneCode('');
    setIsDefaultAddress(false);
    e.currentTarget.reset();
    setValidationErrors({});
  };

  const ERROR_MESSAGE_STYLE = 'text-red-500 text-sm mt-1 ml-1';
  return (
    <form onSubmit={handleSubmit}>
      {/* 배송지명 */}
      <div className="mb-4">
        <label className="block text-[16px] font-medium text-[#1F1E1E]">
          배송지명 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="addressName"
          maxLength={10}
          minLength={1}
          placeholder="최대 10자 이내로 작성해 주세요"
          className={`w-full p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 ${
            validationErrors.addressName ? 'border border-red-700' : 'border'
          }`}
          onInput={handleInput}
        />
        {validationErrors.addressName && (
          <p className={ERROR_MESSAGE_STYLE}>
            유효한 배송지명을 입력해 주세요.
          </p>
        )}
      </div>

      {/* 수령인 */}
      <div className="mb-4">
        <label className="block text-[16px] font-medium text-[#1F1E1E]">
          수령인 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="receiverName"
          maxLength={10}
          minLength={2}
          placeholder="최대 10자 이내로 작성해 주세요"
          className={`w-full p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 ${
            validationErrors.receiverName ? 'border border-red-700' : 'border'
          }`}
          onInput={handleInput}
        />
        {validationErrors.receiverName && (
          <p className={ERROR_MESSAGE_STYLE}>유효한 이름을 입력해 주세요.</p>
        )}
      </div>

      {/* 휴대폰 번호 */}
      <div className="mb-4">
        <label className="block text-[16px]  font-medium text-[#1F1E1E]">
          휴대폰 번호 <span className="text-red-500">*</span>
        </label>
        <input
          value={formattedPhoneNumber}
          onChange={handlePhoneNumberChange}
          onInput={handleInput}
          name="phoneNumber"
          type="text"
          placeholder="010-0000-0000"
          className={`w-full p-3 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 ${
            validationErrors.phoneNumber ? 'border border-red-700' : 'border'
          }`}
        />
        {validationErrors.phoneNumber && (
          <p className={ERROR_MESSAGE_STYLE}>
            010-으로 시작되는 11자리의 숫자를 입력해주세요.
          </p>
        )}
      </div>

      {/* 주소 */}
      <div className="mb-4">
        <label className="block text-[16px]  font-medium text-[#1F1E1E]">
          주소 <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-2 mb-2">
          <input
            disabled
            readOnly
            name="baseAddress"
            type="text"
            placeholder="주소 찾기로 입력해 주세요"
            className="w-full p-3 border rounded select-none"
            value={baseAddressWithZoneCode}
          />
          <button
            type="button"
            className="bg-primary-20 text-white px-4 rounded flex justify-center items-center whitespace-nowrap"
            onClick={daumPostcodeClickHandler}
          >
            주소 찾기
          </button>
        </div>
        <input
          name="detailAddress"
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
        <label htmlFor="defaultAddress" className="ml-2 text-gray-700 text-sm">
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
  );
};

export default AddAddressForm;

'use client';

import { usePaymentRequestStore } from '@/zustand/payment/usePaymentStore';

const PaymentMethodSelect = () => {
  const paymentMethods = ['토스페이', '카카오페이', '일반결제'];
  const { payMethod, setPayMethod } = usePaymentRequestStore();

  return (
    <div className="bg-white p-4 flex flex-col gap-2 rounded-[12px] border-2 border-[#E0E0E0] mb-4">
      <h2 className="text-label-strong text-[18px] font-semibold">결제 수단</h2>
      <div className="">
        {paymentMethods.map((method, index) => (
          <label
            key={method}
            className={`relative cursor-pointer flex items-center space-x-1 py-2 ${
              index !== method.length - 2 ? 'border-b-2 border-[#F2F2F2]' : ''
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={method}
              checked={payMethod === method}
              onChange={() => setPayMethod(method)}
              className="peer hidden"
            />
            <span
              className="relative w-5 h-5 flex justify-center items-center rounded-full border-[1px] border-gray-400 
              peer-checked:bg-primary-20
              "
            >
              {/* 내부 원 */}
              {payMethod === method && (
                <span className="w-[0.6rem] h-[0.6rem] rounded-full bg-white peer-checked:block"></span>
              )}
            </span>
            <span className="text-gray-700 flex items-center gap-1 pl-1">
              {method === '토스페이' && (
                <img src="@/../image/tossIcon.png" className="w-4 h-4" />
              )}
              {method === '카카오페이' && (
                <img src="@/../image/kakaoPayIcon.png" className="w-4 h-4" />
              )}

              {method}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelect;

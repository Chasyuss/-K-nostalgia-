'use client';
import { useUserCartData } from '@/hooks/cart/useUserCartData';
import { useState } from 'react';
import { CouponConfirm } from './CouponConfirm';

interface ModalProps {
  setOpen: () => void;
}

export const RadioButton = ({ setOpen }: ModalProps) => {
  const { cartData } = useUserCartData();
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="w-full">
      <ul className="flex justify-between items-center text-label-alternative pb-4 text-center">
        <li>상품 정보</li>
        <li className="pl-[9rem]">수량</li>
        <li>할인 후 금액</li>
      </ul>
      {cartData?.map((item) => {
        const price = item.product_price ?? 0;
        const discountRate = (item.discountRate ?? 0) / 100;
        const quantity = item.count ?? 1;

        const discountedPrice = price - price * discountRate;

        return (
          <div
            key={item.id}
            className="flex items-center justify-between gap-2 py-6"
          >
            <input
              type="radio"
              id={item.id.toString()}
              name="cartItems"
              value={item.id.toString()}
              checked={selectedOption === item.id.toString()}
              onChange={handleOptionChange}
            />
            <img
              src={item.image || 'image/StateSad.png'}
              alt={item.product_name || '상품명 없음'}
              className="w-16 rounded-[8px]"
            />
            <div className="flex justify-between flex-1">
              <label className="w-28 text-left" htmlFor={item.id.toString()}>
                {item.product_name}
              </label>
              <p>{quantity}</p>
              <strong className="text-primary-20">
                {selectedOption === item.id.toString()
                  ? (discountedPrice * quantity - 2000).toLocaleString()
                  : (discountedPrice * quantity).toLocaleString()}
                원
              </strong>
            </div>
          </div>
        );
      })}
      <CouponConfirm
        selectedOption={selectedOption}
        cartData={cartData}
        setOpen={setOpen}
      />
    </div>
  );
};

'use client';
import { useUserCartData } from '@/hooks/cart/useUserCartData';
import { useState } from 'react';

export const RadioButton = () => {
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
        <li className="pr-2">주문금액</li>
      </ul>
      {cartData?.map((item) => (
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
            <p>{item.count}</p>
            <strong className="text-primary-20">
              {item.product_price?.toLocaleString()}원
            </strong>
          </div>
        </div>
      ))}
    </div>
  );
};

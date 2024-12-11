'use client';

import DeliveryTruck from '@/components/icons/DeliveryTruck';
import { productImgObject } from '@/hooks/payment/getProductImage';
import { usePaymentRequestStore } from '@/zustand/payment/usePaymentStore';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

const OrderProducts = () => {
  const { products } = usePaymentRequestStore();

  return (
    <div className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-2">
      <h2 className="text-label-strong text-[18px] font-semibold">주문 상품</h2>

      <div className="flex gap-1 items-center leading-5 mt-2">
        {/* 트럭 아이콘 */}
        <DeliveryTruck />
        <p className="">
          <span
            style={{
              fontFamily: 'YeojuCeramic',
              fontSize: '12px',
              color: '#9C6D2E'
            }}
          >
            향리배송
          </span>
          <span className="text-sm text-label-alternative mx-2">
            18시 이전 주문시
          </span>
          <span className="text-sm text-primary-20">
            {dayjs().add(1, 'day').format('MM/DD(ddd)')}
            도착
          </span>
        </p>
      </div>

      <ul className="flex flex-col gap-2 mt-1">
        {products.map((product) => {
          const { id, name, amount, quantity } = product;
          return (
            <li key={id} className="flex">
              <img
                src={productImgObject[name]}
                alt="상품 이미지"
                className="w-16 h-16 rounded border"
              />
              <div className="ml-4">
                <p className="text-gray-700">{name}</p>
                <p className="text-gray-500 text-sm">
                  {amount}원 · {quantity}개
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderProducts;

'use client';

import { AllAddresses } from '@/types/deliveryAddress';
import useDeliveryStore from '@/zustand/payment/useDeliveryStore';
import { usePaymentRequestStore } from '@/zustand/payment/usePaymentStore';
import { useState } from 'react';
import DeliveryAddress from './(address)/DeliveryAddress ';
import CouponInPaymentPage from './CouponInPaymentPage';
import OrderProducts from './OrderProducts';
import OrderSummary from './OrderSummary';
import PaymentMethodSelect from './PaymentMethodSelect';

interface Props {
  initialAddresses: AllAddresses;
}

const OrderPageContainer = ({ initialAddresses }: Props) => {
  const [shippingRequest, setShippingRequest] = useState<string>('');
  const [shouldStoreDeliveryRequest, setShouldStoreDeliveryRequest] =
    useState(false);

  const { address } = useDeliveryStore();
  const { products, resetState } = usePaymentRequestStore();

  return (
    <main className="max-w-md mx-auto p-4 bg-normal">
      {/* 배송지 */}
      <DeliveryAddress
        initialData={initialAddresses}
        shippingRequest={shippingRequest}
        shouldStoreDeliveryRequest={shouldStoreDeliveryRequest}
        setShippingRequest={setShippingRequest}
        setShouldStoreDeliveryRequest={setShouldStoreDeliveryRequest}
      />

      {/* 주문 상품 */}
      <OrderProducts products={products} resetState={resetState} />

      {/* 할인 쿠폰 */}
      {/* TODO 추후 작업.(구매 전 쿠폰 적용 작업 이후) */}
      <CouponInPaymentPage />

      {/* 결제 수단 선택 */}
      {/* TODO 3. */}
      <PaymentMethodSelect />

      {/* 결제 요약(가격) 및 결제 버튼 */}
      {/* 결제 요청 로직 분리 이후 테스트 케이스가 필요할 지 고려 */}
      {/* TODO 4. */}
      <OrderSummary />
    </main>
  );
};

export default OrderPageContainer;

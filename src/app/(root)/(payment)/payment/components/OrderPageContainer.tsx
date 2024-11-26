import CouponInPaymentPage from './CouponInPaymentPage';
import DeliveryAddress from './DeliveryAddress ';
import OrderProducts from './OrderProducts';
import OrderSummary from './OrderSummary';
import PaymentHeader from './PaymentHeader';
import PaymentMethodSelect from './PaymentMethodSelect';

const OrderPageContainer = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-normal">
      <PaymentHeader />

      {/* 배송지 */}
      {/* TODO 2. */}
      <DeliveryAddress />

      {/* 주문 상품 */}
      {/* TODO 1. */}
      <OrderProducts />

      {/* 할인 쿠폰 */}
      {/****** 추후 작업.(구매 전 쿠폰 적용 작업 이후) */}
      <CouponInPaymentPage />

      {/* 결제 수단 선택 */}
      {/* TODO 3. */}
      <PaymentMethodSelect />

      {/* 결제 요약(가격) 및 결제 버튼 */}
      {/* TODO 4. */}
      <OrderSummary />
    </div>
  );
};

export default OrderPageContainer;

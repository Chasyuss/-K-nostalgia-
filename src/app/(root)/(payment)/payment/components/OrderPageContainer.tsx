import DeliveryAddress from './(address)/DeliveryAddress ';
import CouponInPaymentPage from './CouponInPaymentPage';
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
      <OrderProducts />

      {/* 할인 쿠폰 */}
      {/****** 추후 작업.(구매 전 쿠폰 적용 작업 이후) */}
      <CouponInPaymentPage />

      {/* 결제 수단 선택 */}
      {/* TODO 3. */}
      <PaymentMethodSelect />

      {/* 결제 요약(가격) 및 결제 버튼 */}
      {/* 결제 요청 로직 분리 이후 테스트 케이스가 필요할 지 고려 */}
      {/* TODO 4. */}
      <OrderSummary />
    </div>
  );
};

export default OrderPageContainer;

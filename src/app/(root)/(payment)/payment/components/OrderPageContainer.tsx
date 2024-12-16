import HeaderWithInfoIcon from '@/components/common/header/_component/HeaderWithInfoIcon';
import DeliveryAddress from './(address)/DeliveryAddress ';
import CouponInPaymentPage from './CouponInPaymentPage';
import OrderProducts from './OrderProducts';
import OrderSummary from './OrderSummary';
import PaymentMethodSelect from './PaymentMethodSelect';

const OrderPageContainer = () => {
  //헤더 info 아이콘에 전달할 툴팁 내용
  const toolTipContentArray = [
    '해당 결제는 가결제입니다.',
    '결제 당일 23시-0시 이내 자동 환불됩니다.',
    '직접 환불을 원할 시',
    '주문 내역에서 주문 취소 버튼을 통해 환불 가능합니다.'
  ];

  return (
    <div className="max-w-md mx-auto p-4 bg-normal">
      <HeaderWithInfoIcon
        toolTipContentArray={toolTipContentArray}
        isIncludeIconHighlighting={true}
      />

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

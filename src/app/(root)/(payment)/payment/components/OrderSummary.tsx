'use client';

import requestPayment from '@/app/api/payment/requestPayment';
import { toast } from '@/components/ui/use-toast';
import { useUser } from '@/hooks/useUser';
import supabase from '@/utils/supabase/client';
import { usePaymentRequestStore } from '@/zustand/payment/usePaymentStore';
import { useRouter } from 'next/navigation';

interface Props {
  payMethod: string;
  shippingRequest: string;
  shouldStoreDeliveryRequest: boolean;
}
const OrderSummary = ({
  payMethod,
  shippingRequest,
  shouldStoreDeliveryRequest
}: Props) => {
  const router = useRouter();

  const { products, orderName, totalAmount } = usePaymentRequestStore();
  const amount = products.reduce((acc, product) => acc + product.amount, 0);
  const totalQuantity = products.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const isCouponApplied = false;

  const { data: user } = useUser();
  const payRequest = async () => {
    if (!user) {
      return console.error('유저 정보 가져올 수 없음');
    }
    const response = await requestPayment({
      payMethod,
      user,
      totalAmount,
      products,
      orderName
    });

    //response.code가 존재 === 결제 실패
    if (response?.code != null) {
      toast({
        variant: 'destructive',
        description: '결제에 실패했습니다 다시 시도해주세요'
      });
      return response;
    }

    //TODO 결제 POPSTATE 제한 로직 추가
    if (shouldStoreDeliveryRequest) {
      await supabase
        .from('users')
        .update({ shippingRequest: shippingRequest })
        .eq('id', user.id);
    }

    router.push(
      `/check-payment?paymentId=${response?.paymentId}&totalQuantity=${totalQuantity}&isCouponApplied=${isCouponApplied}`
    );
  };
  const DELIVERY_FEE = 2500;
  return (
    <>
      <div className="bg-white p-4 flex flex-col gap-2 rounded-[12px] border-2 border-[#E0E0E0] mb-4">
        <div className="flex justify-between text-gray-700 mb-2">
          <span>상품 금액</span>
          <span>{amount}원</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>배송비</span>
          <span>{DELIVERY_FEE}원</span>
        </div>
        <div className="flex justify-between text-gray-700 font-bold">
          <span>결제 금액</span>
          <span>{totalAmount}원</span>
        </div>
      </div>

      {/* 결제 버튼 */}
      <div className="bg-[#FAF8F5] w-full fixed flex justify-center bottom-0 left-0 pt-3 pb-6 shadow-custom">
        <button
          onClick={payRequest}
          className="w-[90%] max-w-[420px] bg-primary-20 text-white py-3 rounded-[12px] font-bold"
        >
          {totalAmount + DELIVERY_FEE}원 결제하기
        </button>
      </div>
    </>
  );
};

export default OrderSummary;

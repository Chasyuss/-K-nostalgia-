import PayButton from '@/components/common/PayButton';
import { Tables } from '@/types/supabase';

type CartButtonProps = {
  data: Tables<'cart'>[];
  selectedItems: string[];
};
const DELIVERY = 2500;
const COUPON = 2000;

export const CartFixedButtons = ({ data, selectedItems }: CartButtonProps) => {
  const totalPrice =
    data?.reduce((acc, item) => {
      if (selectedItems.includes(item.product_id ?? '')) {
        const price = item.product_price ?? 0;
        const quantity = item.count ?? 0;
        const discountRate = (item.discountRate ?? 0) / 100;
        const discountedPrice = price - price * discountRate;
        return acc + discountedPrice * quantity;
      }
      return acc;
    }, 0) || 0;

  const totalAmount = totalPrice + DELIVERY - COUPON;

  const orderNameArr = data
    .map((item) => {
      if (selectedItems.includes(item.product_id as string)) {
        return item.product_name;
      }
      return null;
    })
    .filter((name): name is string => name !== null);

  // 전달 데이터 형식
  // {
  //   name: "청송 사과",
  //   amount: 8000,
  //   quantity: 3,
  // }

  const product = data
    .map((item) => {
      if (selectedItems.includes(item.product_id as string)) {
        return {
          name: item.product_name,
          amount: (item.product_price ?? 0) * (item.count ?? 0),
          quantity: item.count ?? 0
        };
      }
      return null; //장바구니 선택 상품 외 null 처리
    })
    .filter(
      (
        item
        //타입 에러 : 타입 가드로 타입 축소
      ): item is { name: string | null; amount: number; quantity: number } =>
        item != null
    );
  const dataCount = data.map((item) => item.count);
  const totalCount = dataCount.reduce((acc, item) => {
    return (acc ?? 0) + (item ?? 0);
  }, 0);

  return (
    <>
      {data?.length === 0 ? (
        <div className="bg-normal shadow-custom px-4 pt-3 pb-7 fixed bottom-0 left-0 right-0">
          <div className="flex gap-3 ">
            <button className=" bg-label-disable py-3 px-4 rounded-xl text-normal flex-grow">
              상품을 담아주세요
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-normal shadow-custom px-4 pt-3 pb-7 fixed bottom-0 left-0 right-0">
          <div className="flex gap-3 justify-between items-center">
            <p>
              {`${totalCount} 개`}{' '}
              <span className="font-semibold">
                {selectedItems.length > 0
                  ? `${totalAmount.toLocaleString()} 원`
                  : `0 원`}
              </span>
            </p>
            {/* <button onClick={clickButton}>결제하기기기기기기기ㅣ</button> */}
            <PayButton product={product} orderNameArr={orderNameArr} />
          </div>
        </div>
      )}
    </>
  );
};

'use client';
import { Tables } from '@/types/supabase';
import supabase from '@/utils/supabase/client';
import { useState } from 'react';

interface CartdataProps {
  selectedOption: string;
  cartData: Tables<'cart'>[] | undefined;
  setOpen: () => void;
}

// export const updateCartItem = async (itemId: number, updatedPrice: number) => {
//     const { data, error } = await supabase
//         .from('cart')
//         .update({ product_price: updatedPrice })
//         .eq('id', itemId);

//     if (error) {
//         console.error('금액 서버 업데이트 실패', error.message);
//         throw new Error(error.message);
//     }

//     return data;
// };

export const CouponConfirm = ({
  selectedOption,
  cartData,
  setOpen
}: CartdataProps) => {
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const handleConfirmClick = async () => {
    if (isCouponApplied) {
      console.log('쿠폰이 이미 적용되었습니다.');
      return;
    }

    const selectedItem = cartData?.find(
      (item) => item.id.toString() === selectedOption
    );

    if (selectedItem) {
      const price = selectedItem.product_price ?? 0;
      const discountRate = (selectedItem.discountRate ?? 0) / 100;
      const quantity = selectedItem.count ?? 1;

      const discountedPrice = price - price * discountRate;

      const originalPrice = discountedPrice * quantity;
      const updatedPrice = originalPrice - 2000;
      console.log(
        `Updated price for product ID ${selectedItem.product_name}: ${updatedPrice}`
      );

      // try {
      //     await updateCartItem(selectedItem.id, updatedPrice);
      //     console.log('금액 업데이트 성공',updatedPrice);
      //     setIsCouponApplied(true);
      //     setOpen()
      // } catch (error) {
      //     console.error('금액 업데이트 실패', error);
      // }
    }
  };

  return (
    <button
      className="bg-primary-20 rounded-[12px] w-full px-6 py-3 text-label-light"
      onClick={handleConfirmClick}
    >
      쿠폰 적용하기
    </button>
  );
};

'use client';

import supabase from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import FixedButtons from '../_components/FixedButtons';
import Loading from '@/components/common/Loading';
import { OrderDetail } from './_components/OrderDetail';
import { useEffect, useState } from 'react';
import { DetailSlide } from './_components/DetailSlide';
import { CartModal } from './_components/CartModal';
import { useGetProduct } from '@/hooks/localFood/useGetProduct';

type LocalDetailPageProps = {
  params: { id: string };
};

const LocalDetailPage = ({ params: { id } }: LocalDetailPageProps) => {
  const [openModal, setOpenModal] = useState(false); //바텀시트
  const [openCartModal, setOpenCartModal] = useState(false); //카트 담기 완료 모달

  const {
    data: food,
    isPending,
    error
  } = useQuery({
    queryKey: ['localfood', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('local_food')
        .select('*')
        .eq('product_id', id)
        .single();

      if (error) throw new Error(error.message);

      return data;
    }
  });

  if (isPending) return <Loading />;
  if (error) return <div>오류 {error.message}</div>;

  const onPurchase = () => {
    setOpenModal(true);
  };

  const handleCartModalOpen = () => {
    setOpenCartModal(true);
  };

  const handleCartModalClose = () => {
    setOpenCartModal(false);
  };

  return (
    <div>
      {/* 슬라이드 */}
      <DetailSlide images={food.title_image} />

      <div className="m-4">
        <h2 className="text-xl font-semibold">
          {`[${food.location}] `}
          {food?.food_name}
        </h2>
        <p className="text-[#AFACA7] text-sm">{food.description}</p>
        <p className="text-[#1F1E1E] font-bold text-xl mt-2">{`${food?.price?.toLocaleString()}원`}</p>
      </div>
      <div className="border-t-4 border-b-4 border-[#F2F2F2] w-full mt-4 p-4">
        <table className="text-left text-sm">
          <tbody>
            <tr>
              <th className="align-top text-primary-heavy font-medium w-16">
                배송
              </th>
              <td>
                향신배송
                <p className="text-[#76746d]">
                  23시 전 주문 시 내일 아침 8시 전 도착
                  <span className="block">
                    (제주도, 도서산간지역 향신배송 불가)
                  </span>
                </p>
              </td>
            </tr>
            <tr>
              <th className="text-primary-heavy font-medium py-2">배송비</th>
              <td>2,500원</td>
            </tr>
            <tr>
              <th className="text-primary-heavy font-medium">판매자</th>
              <td>향그리움</td>
            </tr>
          </tbody>
        </table>
      </div>

      {food.food_image && (
        <Image
          src={food.food_image}
          width={375}
          height={2451}
          priority
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          alt="상세페이지"
        />
      )}

      <FixedButtons
        food={food}
        count={food.count}
        onPurchase={onPurchase}
        isModalOpen={openModal}
        handleCartModalOpen={handleCartModalOpen}
      />
      {openModal && (
        <div
          className="fixed inset-0 z-[999] bg-[rgba(0,0,0,.24)]"
          onClick={() => setOpenModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭해도 이벤트 발생 X
          >
            <OrderDetail
              params={{ id }}
              isModalOpen={openModal}
              onPurchase={onPurchase}
              handleCartModalOpen={handleCartModalOpen}
            />
          </div>
        </div>
      )}
      {openCartModal && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,.24)] z-[9999]"
          onClick={handleCartModalClose}
        >
          <div
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭해도 이벤트 발생 X
          >
            <CartModal handleCartModalClose={handleCartModalClose} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalDetailPage;

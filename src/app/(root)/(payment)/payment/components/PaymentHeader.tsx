'use client';

import { BackButton } from '@/components/icons/BackButton';
import InfoIcon from '@/components/icons/InfoIcon';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const PaymentHeader = () => {
  //TODO 새로고침시 컨펌창
  const router = useRouter();

  const WARNING_MESSAGE =
    '페이지를 벗어날 경우, 입력한 정보가 저장되지 않습니다';

  const handleBack = () => {
    //TODO 컨펌창 이♡쁜 알림창으로 바꾸기 ~
    if (confirm(WARNING_MESSAGE)) {
      router.back();
    }
  };

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    return (event.returnValue = WARNING_MESSAGE);
    // window.history.pushState(null, '', window.location.href);
  };
  useEffect(() => {
    window.addEventListener(
      'beforeunload',
      handleBeforeUnload
      // ,{
      //   capture: true
      // }
    );

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="flex justify-between items-center mb-4 md:mt-16 m-1">
      <button onClick={handleBack}>
        <BackButton />
      </button>
      <h1 className="text-lg font-semibold">주문/결제</h1>
      {/* //TODO InfoIcon 호버시 안내 문구 띄우기 */}
      <InfoIcon />
    </div>
  );
};

export default PaymentHeader;

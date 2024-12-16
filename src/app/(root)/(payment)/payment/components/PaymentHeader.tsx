//  주문 페이지 앱 헤더
//  update: 24.12.3

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { BackButton } from '@/components/icons/BackButton';
import InfoIcon from '@/components/icons/InfoIcon';

const PaymentHeader = () => {
  const router = useRouter();

  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [iconHighLight, setIconHighLight] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleTooltipToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    localStorage.setItem('isVisit', 'true');

    e.stopPropagation();

    if (intervalRef.current) {
      setIconHighLight(false);
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTooltipVisible((prev) => !prev);
  };

  // 화면 외부 클릭 시 툴팁 닫기
  const handleClickOutsideInfoIcon = () => {
    setTooltipVisible(false);
  };

  useEffect(() => {
    if (isTooltipVisible) {
      document.addEventListener('click', handleClickOutsideInfoIcon);
    }
    return () => {
      document.removeEventListener('click', handleClickOutsideInfoIcon);
    };
  }, [isTooltipVisible]);

  //툴팁 본 적 없을시에 info 아이콘 하이라이팅
  useEffect(() => {
    const isVisit = localStorage.getItem('isVisit');

    if (!isVisit) {
      let blinkCount = 0;

      intervalRef.current = setInterval(() => {
        blinkCount++;
        setIconHighLight((prev) => !prev);

        if (blinkCount === 8) {
          if (intervalRef.current) {
            setIconHighLight(false);
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, 1000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }
  }, []);

  return (
    <div className="flex justify-between items-center mb-4 md:mt-16 m-1">
      {/* 뒤로가기 버튼 */}
      <button onClick={() => router.back()}>
        <BackButton />
      </button>

      <h1 className="text-lg font-semibold">주문/결제</h1>

      {/* Info 아이콘 */}
      <div className="flex items-center justify-center">
        <div className="relative">
          <div
            className="text-white rounded-lg focus:outline-none cursor-pointer"
            onClick={handleTooltipToggle} // 클릭 시 툴팁 상태 토글
          >
            <InfoIcon color={iconHighLight ? '#9C6D2E' : '#959595'} />
          </div>

          {/* 툴팁 */}
          {isTooltipVisible && (
            <div className="absolute top-full transform -translate-x-1/2 mt-3 right-[-9rem]">
              <div className="relative bg-[#9C6D2E] p-4 w-[274px] text-white text-sm rounded-[8px] shadow-lg select-none ">
                해당 결제는 가결제입니다. <br />
                결제 당일 23시-0시 이내 자동 환불됩니다. <br />
                직접 환불을 원할 시 주문 내역에서 주문 취소 <br />
                버튼을 통해 환불 가능합니다.
                {/* 화살표 */}
                <div
                  className="absolute top-[-0.4rem] right-[2%] transform -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderBottom: '8px solid #9C6D2E'
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHeader;

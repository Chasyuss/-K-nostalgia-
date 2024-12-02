'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BackButton } from '@/components/icons/BackButton';
import InfoIcon from '@/components/icons/InfoIcon';

const PaymentHeader = () => {
  const router = useRouter();

  const [isTooltipVisible, setTooltipVisible] = useState(false);
  const [iconHighLight, setIconHighLight] = useState(false);

  const handleTooltipToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
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

  //페이지 첫 방문시 info 아이콘 깜빡임(강조) 효과
  useEffect(() => {
    const isVisit = localStorage.getItem('isVisit');

    if (!isVisit) {
      localStorage.setItem('isVisit', 'true');

      let blinkCount = 0;

      const interValid = setInterval(() => {
        setIconHighLight((prev) => !prev);
        blinkCount++;

        if (blinkCount === 10) {
          clearInterval(interValid);
        }
      }, 500);

      return () => {
        clearInterval(interValid);
      };
    }
    return () => {
      localStorage.removeItem('isVisit');
    };
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

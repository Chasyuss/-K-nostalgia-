'use client';

import TitleLogo from '@/components/icons/TitleLogo';
import { useUser } from '@/hooks/useUser';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ShowSearchCart from './_component/ShowSearchCart';

interface headerNavType {
  path: string;
  pathNaviName: string;
}

const HeaderNav: headerNavType[] = [
  { path: '/', pathNaviName: '홈' },
  { path: 'divider', pathNaviName: '' },
  { path: '/market', pathNaviName: '전통 시장' },
  { path: 'divider', pathNaviName: '' },
  { path: '/local-food', pathNaviName: '특산물' }
];

const HeaderNavPaths = HeaderNav.map((item) => item.path);

const WebHeader = () => {
  const router = useRouter();
  const { data: user } = useUser();
  const pathName = usePathname();
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const targetNavIndex = HeaderNavPaths.indexOf(pathName);
    setCurrentIndex(targetNavIndex);
  }, [pathName]);

  const handleNaviBox = (index: number) => {
    if (isLoading) return;
    if (index === currentIndex) return;
    setIsLoading(true);

    // 홈 = 0 일 때는 무조건 양수 : 4, 2
    // 전통시장 = 2 일 때는 양수 혹은 음수 : -2, 2
    // 특산물 = 4 일 때는 무조건 음수 : -4, -2
    const count = index - currentIndex;

    // 음수 - 역방향 : 특산물일 때 혹은 전통시장에서 홈으로 갈 때 4,3,2,1,0
    if (count < 0) {
      let startIndex = currentIndex;
      const activeInterval = setInterval(() => {
        if (startIndex <= index) {
          setIsLoading(false);
          setActiveIndex(-1);
          clearInterval(activeInterval);
          router.push(HeaderNav[index].path);
        }
        setActiveIndex(startIndex);
        startIndex--;
      }, 400);

      // 양수 - 정방향 : 홈일 때 혹은 전통시장에서 특산물로 갈 때 0,1,2,3,4
    } else {
      let startIndex = currentIndex;
      const activeInterval = setInterval(() => {
        if (startIndex >= index) {
          setIsLoading(false);
          setActiveIndex(-1);
          clearInterval(activeInterval);
          router.push(HeaderNav[index].path);
        }
        setActiveIndex(startIndex);
        startIndex++;
      }, 400);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[72px] border-b border-[#C8C8C8] bg-normal">
      <div className="flex justify-between flex-1 max-w-screen-xl mx-auto">
        <div className="flex items-center gap-12">
          <TitleLogo />
          <nav className="relative flex items-center gap-5">
            {HeaderNav.map((item: headerNavType, index: number) => (
              <div
                key={index}
                className="flex flex-row justify-center items-center gap-5"
              >
                {item.path === 'divider' ? (
                  <div
                    className={`w-[72px] h-[1px] bg-label-alternative rounded-[0.5px] transition-colors duration-300 ${
                      index === activeIndex
                        ? 'bg-primary-30'
                        : 'bg-label-alternative'
                    }`}
                  >
                    {' '}
                  </div>
                ) : (
                  <div
                    onClick={() => handleNaviBox(index)}
                    className={`py-[23px] px-5 cursor-pointer transition-colors duration-300 ${
                      pathName === item.path
                        ? 'text-primary-10'
                        : 'text-label-alternative'
                    }
                  ${
                    index === activeIndex
                      ? 'text-primary-30'
                      : 'text-label-alternative'
                  }
                  `}
                  >
                    {item.pathNaviName}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        <div className="flex gap-5">
          <div className="flex items-center justify-center">
            <ShowSearchCart showSearch={true} showCart={true} />
          </div>
          {user && user?.avatar ? (
            <div className="flex items-center gap-2">
              <Image
                src={user.avatar}
                alt={`${user.nickname} 이미지`}
                width={36}
                height={36}
                className="w-9 h-9 border rounded-full border-primary-10"
              />
              <div>{user.nickname}</div>
            </div>
          ) : (
            <div>
              <div>입장</div>
              <div>회원</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebHeader;

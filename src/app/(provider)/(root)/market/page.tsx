'use client';

import FilterButton from '@/components/ui/FilterButton';
import { MarketType, RegionData } from '@/types/Market';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { GoHeart } from 'react-icons/go';
import { GoHeartFill } from 'react-icons/go';
import { RiMoreLine } from 'react-icons/ri';

const MarketPage = () => {
  const [markets, setMarkets] = useState<MarketType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [heart, setHeart] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('전체');
  const [activeSmallFilter, setActiveSmallFilter] = useState('전체');
  const [totalPages, setTotalPages] = useState(0);
  const [selectedLargeRegion, setSelectedLargeRegion] = useState('전체');
  const [selectedSmallRegion, setSelectedSmallRegion] = useState('');

  // 시장 데이터 불러오는 API
  const fetchMarkets = async (page: number) => {
    let url = '';
    if (selectedLargeRegion === '전체') {
      url = `/api/market/list?page=${page}`;
    } else {
      url = `/api/market/filter-list?page=${page}&largeRegion=${encodeURIComponent(
        selectedLargeRegion
      )}`;
      if (selectedSmallRegion) {
        url += `&smallRegion=${encodeURIComponent(selectedSmallRegion)}`;
      }
    }
    try {
      const response = await fetch(url);
      const { data, totalPages } = await response.json();
      setMarkets(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('데이터를 가져오지 못했습니다.', error);
    }
  };
  // console.log('markets____', markets);
  // console.log('totalPages____', totalPages);

  // 필터
  const regionData: RegionData = {
    전체: ['전체'],
    서울: ['서울'],
    경기: ['경기'],
    인천: ['인천'],
    강원: ['강원'],
    충청: ['전체', '충북', '충남', '대전', '세종'],
    경상: ['전체', '경북', '경남', '대구', '부산', '울산'],
    전라: ['전체', '전북', '전남', '광주'],
    제주: ['제주']
  };

  const largeRegions = Object.keys(regionData);
  const regionWithSmall = ['충청', '경상', '전라'];

  useEffect(() => {
    fetchMarkets(currentPage);
  }, [currentPage, selectedLargeRegion, selectedSmallRegion]);

  const handleHeart = (identity: string, event: React.MouseEvent) => {
    event.preventDefault();
    if (!heart.includes(identity)) setHeart((prev) => [...prev, identity]);
    else setHeart((prev) => prev.filter((el) => el !== identity));
  };

  const handleLargeRegionChange = (region: string) => {
    setSelectedLargeRegion(region);
    setActiveFilter(region);
    setSelectedSmallRegion('');
    setCurrentPage(1);
  };

  const handleSmallRegionChange = (region: string) => {
    if (region === '전체') {
      setSelectedSmallRegion('');
    } else {
      setSelectedSmallRegion(region);
    }
    setActiveSmallFilter(region);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="w-full p-4 mb-6">
        <div className="flex overflow-auto scrollbar-hide gap-2 border-b-[1px] border-[#E0E0E0]">
          {largeRegions.map((region) => (
            <button
              key={region}
              onClick={() => handleLargeRegionChange(region)}
              className={`text-nowrap text-base font-medium pt-2 px-3 pb-3 ${
                activeFilter === region
                  ? 'text-primary-20 border-b-4 border-primary-20'
                  : 'text-label-alternative'
              }`}
            >
              {region}
            </button>
          ))}
        </div>
        {regionWithSmall.includes(selectedLargeRegion) && (
          <div className="flex overflow-auto scrollbar-hide pt-4 gap-2">
            {regionData[selectedLargeRegion].map((small) => (
              <button
                key={small}
                onClick={() => handleSmallRegionChange(small)}
                className={`text-nowrap text-base font-medium px-4 py-[6px] rounded-[4px] ${
                  activeSmallFilter === small
                    ? 'text-label-light bg-secondary-20'
                    : 'text-label-strong bg-secondary-60'
                }`}
              >
                {small}
              </button>
            ))}
          </div>
        )}
        <div className="justify-center place-content-center ">
          <Image
            src={
              'https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/markets/market-banner.png'
            }
            width={343}
            height={80}
            priority
            alt="시장배너이미지"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            className="mt-4"
          />

          <div className="flex flex-col mt-4 gap-5 ">
            {loading ? (
              <p>로딩중...</p>
            ) : (
              markets?.map((item, index) => (
                <div
                  key={index}
                  className="py-3 px-3 rounded-xl border border-solid border-secondary-50
              bg-normal"
                >
                  <Link href={`/market/${item.id}`}>
                    <div className="flex flex-col mb-2">
                      <div className="flex justify-between">
                        <p className="pl-1 text-base font-semibold text-label-strong">
                          {item.시장명}
                        </p>

                        <button
                          onClick={(event) =>
                            handleHeart(item.도로명주소, event)
                          }
                        >
                          {heart.includes(item.도로명주소) ? (
                            <GoHeartFill className="w-5 h-5 text-[#DB3B3B]" />
                          ) : (
                            <GoHeart className="w-5 h-5 text-[#545454]" />
                          )}
                        </button>
                      </div>
                      <p className="pl-1 text-sm text-label-alternative">
                        {item.도로명주소}
                      </p>
                    </div>
                    {item.이미지 ? (
                      <div className="relative flex gap-2">
                        {item.이미지.slice(0, 2).map((imgSrc, index) => (
                          <div
                            key={index}
                            className=" gap-2 rounded-[8px] relative w-[156px] h-[130px]"
                          >
                            <Image
                              src={imgSrc}
                              alt={`${item.시장명} - 이미지 ${index + 1}`}
                              fill
                              sizes="(max-width: 768px) 100vw, 343px"
                              priority
                              className="absolute w-full h-full rounded-[8px]"
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p style={{ color: 'red' }}>Error: {item.error}</p>
                    )}
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-64">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-1 ${
            currentPage === 1
              ? 'text-label-assistive cursor-not-allowed'
              : 'text-label-strong'
          }`}
        >
          <div className="flex gap-[6px] place-items-center font-medium">
            <BsChevronLeft className="w-4 h-4 text-color-[#0B0B0B]" />
            이전
          </div>
        </button>
        <div className="flex space-x-2">
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            if (
              (pageNumber >= currentPage - 1 &&
                pageNumber <= currentPage + 1) ||
              (currentPage === 1 && pageNumber <= 3)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`py-1 gap-[2px] text-primary-10 text-center w-10 h-10 ${
                    currentPage === pageNumber &&
                    'border border-solid rounded-[6px] border-primary-30'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }
            return null;
          })}
          <div className="flex gap-[6px] place-items-center">
            {currentPage < totalPages - 1 && (
              <RiMoreLine
                onClick={() => setCurrentPage(totalPages)}
                className="w-4 h-4 text-primary-10"
              />
            )}
          </div>
        </div>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-1 ${
            currentPage === totalPages
              ? 'text-label-assistive cursor-not-allowed'
              : 'text-label-strong'
          }`}
        >
          <div className="flex gap-[6px] place-items-center font-medium">
            다음
            <BsChevronRight className="w-6 h-6 text-color-[#0B0B0B]" />
          </div>
        </button>
      </div>
    </>
  );
};

export default MarketPage;

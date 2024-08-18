'use client';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import React, { act, useCallback, useEffect, useState } from 'react';
import SearchRecommendations from './SearchRecommendations';
import { GoSearch } from 'react-icons/go';
import { Tables } from '@/types/supabase';
import useDebounce from '@/hooks/useDebounce';
import HomeSearchResult from './HomeSearchResult';
import MarketSearchResult from './MarketSearchResult';
import LocalFoodSearchResult from './LocalFoodSearchResults';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

type Market = Tables<'markets'>;
type LocalFood = Tables<'local_food'>;

const SearchBar = ({ isOpen, setIsOpen }: SearchBarProps) => {
  const pathName = usePathname();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [response, setResponse] = useState<
    (Tables<'local_food'> | Tables<'markets'>)[] | null
  >(null);
  const [results, setResults] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const debounceSearchTerm = useDebounce(searchTerm, 300);
  const router = useRouter();

  const marketSide = pathName === '/market' || pathName.startsWith('/market');
  const localFoodSide =
    pathName === '/local-food' || pathName.startsWith('/local-food/');
  const homeSide = pathName === '/';

  // TODO 이스터애그 숨기기 예쁘게 알럿 제작하기!
  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
      .normalize('NFKC')
      .toLowerCase()
      .trim();

    setSearchTerm(event.target.value);

    if (event.target.value.trim() === '') {
      setResponse(null);
      setActiveIndex(0);
    }
    // 검색어 길이 제한 및 이스터애그'-'
    if (event.target.value.length >= 20) {
      alert('20자 미만으로 검색해주세어흥');
      setActiveIndex(-1);
      setSearchTerm('');
      return;
    } else if (inputValue === '향그리움'.trim()) {
      console.log('향그리움을 입력햇다!!!!');
      setActiveIndex(-1);
      return;
    } else if (
      inputValue === '오조사마'.trim() ||
      inputValue === '5JOSAMA'.normalize('NFKC').toLowerCase().trim() ||
      inputValue === 'OJOSAMA'.normalize('NFKC').toLowerCase().trim()
    ) {
      console.log('오조사마를 입력햇다!!!!');
      setActiveIndex(-1);
      return;
    }
  };

  //검색어 전송 분기 처리
  const submitSearchTerm = useCallback(async () => {
    if (debounceSearchTerm.trim() === '') {
      setResponse([]);
      setActiveIndex(-1);
      return;
    }

    // 'markets' or 'local-food', home일 땐 빈 문자열
    const tableValue = marketSide
      ? 'markets'
      : localFoodSide
      ? 'local_food'
      : '';

    try {
      const response = await fetch(
        tableValue ? '/api/search' : '/api/search/home',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          },
          // 공백 제거
          body: JSON.stringify({
            searchValue: debounceSearchTerm.replace(/\s+/g, '').trim(),
            tableValue
          })
        }
      );
      const data = await response.json();
      setResponse(data);
      setActiveIndex(-1);
    } catch (error) {
      console.log(error);
    }
  }, [debounceSearchTerm, localFoodSide, marketSide]);

  // 계속해서 작동
  useEffect(() => {
    if (debounceSearchTerm) {
      submitSearchTerm();
    }
  }, [debounceSearchTerm, submitSearchTerm]);

  // 키보드 키로 검색어 이동
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (response === null || response.length === 0) return;

    // 위 화살표
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((prev) => (prev <= 0 ? prev : prev - 1));
    }
    // TODO 아래 화살표 뭔가 뭔가 이상함;;;
    else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((prev) => (prev >= response.length - 1 ? prev : prev + 1));
    }
    // 엔터
    else if (event.key === 'Enter') {
      event.preventDefault();
      // 방어 코딩
      if (activeIndex >= 0 && activeIndex < response.length) {
        console.log(response[activeIndex]);
        LinkToItems(response[activeIndex]);
      }
    }
  };

  // 엔터로 이동하는 함수
  const LinkToItems = (item: Market | LocalFood) => {
    setIsOpen(false);
    setActiveIndex(-1);
    if ('food_name' in item) {
      router.push(`/local-food/${item.product_id}`);
    } else if ('시장명' in item) {
      router.push(`/market/${item.id}`);
    }
  };

  // TODO 1. 최근 검색어 저장- 로컬 스토리지
  const recentResults = () => {};

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="top"
        className="bg-normal rounded-b-[12px] md:w-[768px] md:mx-auto lg:w-[990px]"
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div className="w-full relative flex items-center">
          <Input
            placeholder={
              marketSide
                ? '시장을 검색해주세요'
                : localFoodSide
                ? '특산물을 검색해주세요'
                : homeSide
                ? '시장과 특산물을 검색해주세요'
                : '이 페이지 검색은 준비 중이에요'
            }
            value={searchTerm}
            onChange={handleSearchTerm}
            onKeyDown={handleKeyDown}
            disabled={!marketSide && !localFoodSide && !homeSide}
            className={`pr-10 placeholder:text-label-alternative text-base bg-[#FEFEFE] ${
              searchTerm.trim() === ''
                ? 'border-primary-30 rounded-[6px]'
                : 'border-label-assistive border-b-0 rounded-t-[6px]'
            }`}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 flex items-center h-full"
            disabled={!marketSide && !localFoodSide && !homeSide}
            aria-label="검색"
            style={{ border: 'none', background: 'none' }}
            onClick={submitSearchTerm}
          >
            <GoSearch className="w-[22px] h-[22px]" />
          </Button>
        </div>

        {/* 검색+최근 하단 둥글게, 검색되면 보이기 */}
        <div
          className={`flex flex-col border border-t-0 border-label-assistive rounded-b-[6px] bg-[#FEFEFE] ${
            searchTerm.trim() === '' ? 'hidden' : 'block'
          }`}
        >
          {/* 검색 결과 있을 경우 */}
          {response !== null && response.length > 0 && (
            <>
              {homeSide && (
                <HomeSearchResult
                  response={response}
                  setIsOpen={setIsOpen}
                  activeIndex={activeIndex}
                />
              )}
              {marketSide && (
                <MarketSearchResult
                  response={response as Market[]}
                  setIsOpen={setIsOpen}
                  activeIndex={activeIndex}
                />
              )}
              {localFoodSide && (
                <LocalFoodSearchResult
                  response={response as LocalFood[]}
                  setIsOpen={setIsOpen}
                  activeIndex={activeIndex}
                />
              )}
            </>
          )}

          <div className="px-3 py-[6px] text-xs border-t border-label-assistive">
            최근 검색어
          </div>
        </div>

        {/* 검색 결과 없을 경우 검색창에서 보이는 것 X */}
        {response !== null && response.length === 0 && (
          <div className="text-left text-md text-label-alternative pt-5 px-2">
            검색 결과가 없습니다.
            <p>
              <span className="font-semibold">
                {marketSide
                  ? '시장'
                  : localFoodSide
                  ? '특산물'
                  : '시장과 특산물'}
              </span>
              에 대해 검색해주세요!
            </p>
          </div>
        )}

        {/* 검색하지 않을 때만 보여주기 */}
        {searchTerm.trim() === '' && (
          <SearchRecommendations setIsOpen={setIsOpen} />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SearchBar;

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { CountButton } from './CountButton';
import supabase from '@/utils/supabase/client';
import { DeleteButton } from './DeleteButton';
import Link from 'next/link';
import { DataTable } from './DataTable';
import { useEffect } from 'react';
import Loading from '@/components/common/Loading';
import { useUserCartData } from '@/hooks/cart/useUserCartData';

export type CartItem = {
  id: string | null;
  product_id: string | null;
  image: string[] | null;
  product_price: number | null;
  product_name: string | null;
  count: number | null;
};

interface TableProps {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

const fetchCartItems = async () => {
  const { data: cartItems, error } = await supabase.from('cart').select('*');

  if (error) {
    console.error('장바구니 데이터를 가져오지 못했습니다.', error);
    return [];
  }

  const mappedCartItems = cartItems.map((item) => ({
    product_id: item.product_id,
    image: item.image ? item.image[0] : null,
    product_price: item.product_price,
    product_name: item.product_name,
    count: item.count
  }));

  return mappedCartItems;
};

export const TableDataColumns = ({
  selectedItems,
  setSelectedItems
}: TableProps) => {
  const { cartData, isPending, error } = useUserCartData();

  useEffect(() => {
    if (cartData) {
      setSelectedItems(
        //null인 경우 빈문자열로 대체
        cartData.map((item) => item.product_id ?? '')
      );
    }
  }, [cartData]);

  if (isPending) return <Loading />;
  if (error) return <div>오류 {error.message}</div>;

  const columns: ColumnDef<CartItem>[] = [
    {
      //TODO : 체크된 상품만 결제금액 노출, 구매
      //전체선택
      id: 'select',
      header: ({ table }) => (
        <div className="flex items-center whitespace-nowrap">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => {
              const newSelectedItems = value
                ? cartData?.map((item) => item.product_id)
                : [];
              setSelectedItems(newSelectedItems as string[]);
              table.toggleAllPageRowsSelected(!!value);
            }}
            aria-label="Select all"
          />
          <div className="text-base text-label-strong ml-2 absolute left-10">
            {`전체 선택 (${table.getFilteredSelectedRowModel().rows.length}/${
              table.getFilteredRowModel().rows.length
            })`}
          </div>
        </div>
      ),
      //부분선택
      cell: ({ row }) => (
        <Checkbox
          checked={selectedItems.includes(row.getValue('product_id'))}
          onCheckedChange={(value) => {
            setSelectedItems((prev) => {
              if (value) {
                return [...prev, row.getValue('product_id')];
              } else {
                return prev.filter((id) => id != row.getValue('product_id'));
              }
            });
          }}
          aria-label="Select row"
          style={{ transform: 'translate(0, -130%)' }}
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      //상품 이미지
      accessorKey: 'image',
      header: '',
      cell: ({ row }) => (
        <Link href={`/local-food/${row.getValue('product_id')}`}>
          <Image
            src={row.getValue('image')}
            width={96}
            height={96}
            priority
            alt={row.getValue('product_name')}
            style={{
              borderRadius: '8px',
              width: 96,
              height: 96,
              objectFit: 'cover',
              translate: '-16%',
              marginLeft: '5px'
            }}
          />
        </Link>
      )
    },
    {
      //상품 이름
      accessorKey: 'product_name',
      header: '',
      cell: ({ row }) => (
        <div className="text-label-strong text-base translate-x-[-45%] translate-y-[-150%]">{`${row.getValue(
          'product_name'
        )}`}</div>
      )
    },
    {
      //상품 가격
      accessorKey: 'product_price',
      header: '',
      cell: ({ row }) => (
        <div className="absolute left-[58%] translate-x-[-35%] translate-y-[-80%] text-lg text-primary-strong font-semibold">
          {`${row.getValue('product_price')?.toLocaleString()} 원`}
          <span className="text-base font-normal text-label-assistive line-through pl-2 translate-x-[80%]">
            {`${(
              ((row.getValue('product_price') as number) || 0) + 2000
            ).toLocaleString()}원`}
          </span>
        </div>
      )
    },
    {
      //수량 버튼
      accessorKey: 'count',
      header: '',
      cell: ({ row }) => (
        <div className="absolute left-[58%] translate-x-[-55%] translate-y-[10%] ">
          <CountButton
            product_id={row.getValue('product_id')}
            counts={row.getValue('count')}
          />
        </div>
      )
    },

    {
      accessorKey: 'product_id',
      header: '',
      cell: ({ row }) => (
        <div style={{ display: 'none' }}>{row.getValue('product_id')}</div>
      )
    },
    {
      //삭제 버튼
      id: 'delete',
      header: '',
      cell: ({ row }) => (
        <div className="translate-x-0 translate-y-[-100%]">
          <DeleteButton productId={row.getValue('product_id')} />
        </div>
      )
    }
  ];
  return (
    <DataTable
      columns={columns}
      data={cartData ?? []}
      selectedItems={selectedItems}
    />
  );
};

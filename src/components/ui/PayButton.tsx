'use client';

//장바구니, 특산물 상세 페이지에 위치하는 결제 버튼

//feat1. 결제에 필요한 정보 전역에 저장(클릭 이벤트) - zustand
//feat2. 결제 페이지로 redirect
//feat3. 스타일링 - text props 값에 따른 스타일링

//update : 24.11.20

import { useRouter } from 'next/navigation';

import { useUser } from '@/hooks/useUser';
import { usePaymentRequestStore } from '@/zustand/payment/usePaymentStore';

import { Tables } from '@/types/supabase';
import { toast } from './use-toast';

type ProductProps = {
  id: string | null;
  name: string | null;
  amount: number;
  quantity: number;
}[];

type Props = {
  orderNameArr: string[];
  product: ProductProps;
  text: string; //버튼 텍스트 - 버튼 비활성화 및 스타일링에 사용
  //TODO isCouponApplied: boolean
};

type setGlobalStateParams = {
  orderNameArr: string[];
  nowUser: Tables<'users'>;
};
type ButtonStylesObj = {
  [key: string]: string;
};

const PayButton = ({ orderNameArr, product, text }: Props) => {
  const router = useRouter();
  const { data: nowUser } = useUser(); //getUser-query

  const { setOrderName, setTotalAmount, setProducts } =
    usePaymentRequestStore(); //zustand

  //총액 계산 함수
  //TODO 쿠폰 할인 적용 작업 끝나면 넘겨받은 금액이 배송비, 쿠폰할인 포함 총 가격인지 재확인 할 것
  const calculateTotalAmount = (product: ProductProps) => {
    return product.reduce((acc, item) => acc + item.amount, 0);
  };

  //payRequest값 저장(zustand)
  const setPayRequestDataInGlobalState = ({
    orderNameArr,
    nowUser
  }: setGlobalStateParams) => {
    const totalAmount = calculateTotalAmount(product);
    setTotalAmount(totalAmount);
    setOrderName(orderNameArr.join(','));
    setProducts(product as any);

    // const { id, name, phoneNumber, email, address } = nowUser;
    // setCustomer({
    //   customerId: id,
    //   fullName: name as string,
    //   phoneNumber: phoneNumber as string,
    //   email: email as string,
    //   address: address as object
    // });
  };

  //전역 관리 이후 redirect
  const setPaymentDataAndRedirect = () => {
    if (!nowUser) {
      return toast({
        description: '로그인 후 이용 가능합니다'
      });
    }
    if (product.length === 0) {
      return toast({
        description: '구매할 상품을 선택 해 주세요'
      });
    }
    setPayRequestDataInGlobalState({ orderNameArr, nowUser });
    router.push('/payment');
  };

  // const pathName = usePathname();
  // const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);

  // const date = dayjs(new Date(Date.now())).locale('ko').format('YYMMDD');
  // const newPaymentId = `${date}-${uuidv4().slice(0, 13)}`; //주문 번호 생성

  // const totalQuantity = product.reduce((acc, item) => acc + item.quantity, 0);
  // const isCouponApplied: boolean = true; //TODO 쿠폰 적용 여부 더미 (테스트용)

  // const [lastCallTime, setLastCallTime] = useState(0);
  // const THROTTLE_DELAY = 5000;

  // useEffect(() => {
  //   //결제 창 활성화 시 PopStateEvent 제한
  //   const handlePopstate = (e: PopStateEvent) => {
  //     if (isPaymentOpen) {
  //       e.preventDefault();
  //       window.history.pushState(null, '', window.location.href);
  //       toast({
  //         description: '결제창을 먼저 종료해주세요'
  //       });
  //     }
  //   };
  //   if (isPaymentOpen) {
  //     window.history.pushState(null, '', window.location.href);
  //     window.addEventListener('popstate', handlePopstate);
  //   }
  //   return () => {
  //     window.removeEventListener('popstate', handlePopstate);
  //   };
  // }, [isPaymentOpen]);

  //결제 요청 함수 with throttling
  //TODO throttle을 hooks 폴더 내 파일로 분리하는 것 고려
  // const onPayButtonClickThrottled = useCallback(async () => {
  //   if (product.length === 0) {
  //     return toast({
  //       description: '구매할 상품을 선택 해 주세요'
  //     });
  //   }

  //   const now = Date.now();

  //   if (now - lastCallTime >= THROTTLE_DELAY) {
  //     setLastCallTime(now);
  //     setIsPaymentOpen(true);
  //     window.history.pushState(null, '', window.location.href);

  //     toast({
  //       variant: 'destructive',
  //       description: '가결제입니다, 당일 자정 전 일괄 환불됩니다'
  //     });
  //     setTimeout(() => {
  //       toast({
  //         variant: 'destructive',
  //         description: '즉시 환불은 마이페이지에서 가능합니다'
  //       });
  //     }, 1500);

  //     const { name, email, id } = user;
  //     const requestOrderName = orderNameArr.join(',');

  //     //결제 요청
  //     const response = await PortOne.requestPayment({
  //       storeId: process.env.NEXT_PUBLIC_STORE_ID as string,
  //       channelKey: process.env.NEXT_PUBLIC_INICIS_CHANNEL_KEY,
  //       paymentId: `${newPaymentId}`,
  //       orderName: requestOrderName,
  //       totalAmount,
  //       currency: 'CURRENCY_KRW',
  //       payMethod: 'CARD',
  //       products: product as any,
  //       redirectUrl:
  //         process.env.NODE_ENV === 'production'
  //           ? `https://https://k-nostalgia-one.vercel.app/check-payment?totalQuantity=${totalQuantity}&isCouponApplied=${isCouponApplied}`
  //           : `http://localhost:3000/check-payment?totalQuantity=${totalQuantity}&isCouponApplied=${isCouponApplied}`,
  //       appScheme:
  //         process.env.NODE_ENV === 'production'
  //           ? `https://https://k-nostalgia-one.vercel.app/check-payment?totalQuantity=${totalQuantity}&isCouponApplied=${isCouponApplied}`
  //           : `http://localhost:3000/check-payment?totalQuantity=${totalQuantity}&isCouponApplied=${isCouponApplied}`,
  //       noticeUrls: [
  //         //webhook url
  //         `https://k-nostalgia-one.vercel.app/api/payment/webhook`, //실 배포 url
  //         'https://k-nostalgia-vdpl.vercel.app/api/payment/webhook', //테스트용 배포 url
  //         'https://7ac2-121-163-241-29.ngrok-free.app/api/payment/webhook' //테스트용 ngrok 서버
  //       ],

  //       customer: {
  //         customerId: id,
  //         email: email as string,
  //         phoneNumber: '01000000000',
  //         fullName: name as string
  //       },
  //       windowType: {
  //         pc: 'IFRAME',
  //         mobile: 'REDIRECTION'
  //       },
  //       bypass: {
  //         inicis_v2: {
  //           acceptmethod: [`SKIN(#586452)`]
  //         }
  //       }
  //     });

  //     const paymentId = response?.paymentId;

  //     //response.code가 존재 === 결제 실패
  //     if (response?.code != null) {
  //       toast({
  //         variant: 'destructive',
  //         description: '결제에 실패했습니다 다시 시도해주세요'
  //       });
  //       setIsPaymentOpen(false);
  //       setLastCallTime(0);
  //       return router.replace(`${pathName}`);
  //     }
  //     setIsPaymentOpen(false);

  //     //결제 확인 페이지로 이동(check-payment)
  //     //paymentId : 내역 조회에 사용
  //     router.push(
  //       `/check-payment?paymentId=${paymentId}&totalQuantity=${totalQuantity}&isCouponApplied=${isCouponApplied}`
  //     );
  //   } else {
  //     toast({
  //       description: '결제 창 요청중입니다'
  //     });
  //   }
  // }, [
  //   user,
  //   product,
  //   orderNameArr,
  //   totalQuantity,
  //   totalAmount,
  //   router,
  //   pathName,
  //   lastCallTime
  // ]);

  const ButtonStylesObj: ButtonStylesObj = {
    '바로 구매하기':
      'min-w-[165px] flex bg-primary-strong py-3 px-4 rounded-xl text-white max-w-[234px] w-screen justify-center items-center leading-7',
    '선택 상품 주문하기':
      'flex flex-1 w-[336px] h-[48px] py-[12px] px-[16px] justify-center items-center rounded-xl text-[#9C6D2E] font-semibold leading-7 border-[1px] border-[#9C6D2E]',
    '전체 상품 주문하기':
      'flex flex-1 w-[336px] h-[48px] py-[12px] px-[16px] justify-center items-center rounded-xl text-white font-semibold leading-7 bg-[#9C6D2E]'
  };
  const buttonDisabled = product.length === 0;

  let PayButtonStyle = ButtonStylesObj[text];

  if (buttonDisabled) {
    switch (text) {
      case '바로 구매하기':
        PayButtonStyle =
          'min-w-[165px] max-w-[234px] w-screen flex justify-center items-center bg-stone-200 py-3 px-4 rounded-xl text-white leading-7';
        break;
      case '선택 상품 주문하기':
        PayButtonStyle =
          'flex flex-1 w-[336px] h-[48px] py-[12px] px-[16px] justify-center items-center rounded-xl text-stone-300 font-semibold leading-7 border-[1px] border-stone-300';
        break;
      case '전체 상품 주문하기':
        PayButtonStyle =
          'flex flex-1 w-[336px] h-[48px] py-[12px] px-[16px] justify-center items-center rounded-xl text-white font-semibold leading-7 bg-stone-200';
        break;
      default:
        break;
    }
  }

  return (
    <button
      className={PayButtonStyle}
      onClick={setPaymentDataAndRedirect}
      disabled={buttonDisabled}
    >
      {text}
    </button>
  );
};

export default PayButton;

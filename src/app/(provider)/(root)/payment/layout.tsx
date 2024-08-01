import DefaultAppLayout from '@/components/common/DefaultAppLayout';
import { PropsWithChildren } from 'react';

function PaymentLayout({ children }: PropsWithChildren) {
  return (
    <DefaultAppLayout
      showHeader={true}
      showNavigation={true}
      headerTitle="주문 내역"
      showChat={false}
      showSearch={false}
      showCart={false}
    >
      {children}
    </DefaultAppLayout>
  );
}

export default PaymentLayout;

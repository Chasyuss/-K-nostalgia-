// 배송지 관리 페이지

import AddNewAddressButton from './_components/AddNewAddressButton';
import NoDeliveryAddress from './_components/NoDeliveryAddress';

const DeliveryAddressManagement = () => {
  const hasNoAddress = true;
  return (
    <>
      {!hasNoAddress ? (
        <NoDeliveryAddress />
      ) : (
        <div className="max-w-md mx-auto flex flex-col p-4 bg-normal">
          {/* 내부 요소 들어갈 부분 */}
        </div>
      )}
      <div className="p-4 flex justify-center bg-white shadow-md fixed bottom-0 w-full">
        <AddNewAddressButton />
      </div>
    </>
  );
};

export default DeliveryAddressManagement;

// 배송지 관리 페이지

import { getAddressesInServerComponent } from '@/hooks/deliveryAddress/getAddresses';

import { AllAddresses } from '@/types/deliveryAddress';

import AddNewAddressButton from './_components/AddNewAddressButton';
import AddressesList from './_components/AddressesList';
import NoDeliveryAddress from './_components/NoDeliveryAddress';

const DeliveryAddressManagement = async () => {
  const allAddresses: AllAddresses = await getAddressesInServerComponent();
  const { defaultAddress, addresses } = allAddresses;

  const hasNoDefaultAddress: boolean = defaultAddress === null;
  const hasNoAddresses: boolean = hasNoDefaultAddress && addresses === null;

  return (
    <>
      {hasNoAddresses ? (
        <NoDeliveryAddress />
      ) : (
        <div className="max-w-md mx-auto flex flex-col p-4 bg-normal">
          <AddressesList initialData={allAddresses} />
        </div>
      )}
      <div className="p-4 flex justify-center bg-white shadow-md fixed bottom-0 w-full">
        <AddNewAddressButton />
      </div>
    </>
  );
};

export default DeliveryAddressManagement;

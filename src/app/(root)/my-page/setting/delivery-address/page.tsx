// 배송지 관리 페이지

import api from '@/service/service';
import { AllAddresses } from '@/types/deliveryAddress';
import { createClient } from '@/utils/supabase/server';
import AddNewAddressButton from './_components/AddNewAddressButton';
import AddressesList from './_components/AddressesList';
import NoDeliveryAddress from './_components/NoDeliveryAddress';

const getAddress = async () => {
  const supabase = createClient();

  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return console.error('유저 정보 가져오기 실패');
  }
  const userId = data.user.id;

  return await api.address.getAddresses(userId);
};

const DeliveryAddressManagement = async () => {
  const allAddresses: AllAddresses = await getAddress();
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

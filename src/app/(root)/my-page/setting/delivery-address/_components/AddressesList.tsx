'use client';

import { AllAddresses } from '@/types/deliveryAddress';
import { useState } from 'react';
import DeliveryAddressItem from './DeliveryAddressItem';

interface Props {
  initialData: AllAddresses;
}

const AddressesList = ({ initialData }: Props) => {
  const { defaultAddress, addresses } = initialData;
  const [defaultAddressState, setDefaultAddressState] =
    useState(defaultAddress);
  const [addressesState, setAddressesState] = useState(addresses);

  //배송지 수정
  const updateDeliveryAddress = () => {
    alert(
      'api/delivery-address, service/address.service.ts 파일에 필요한 로직 추가해서 작업해주시면될것같아용'
    );
  };

  //배송지 삭제
  const deleteDeliveryAddress = () => {
    alert(
      'DB에 defaultAddress, addresses로 항목 나눠서 들어가져있고 각각 id 포함되어있습니다'
    );
  };

  return (
    <div className="mt-14 mb-16 overflow-auto flex flex-col gap-4">
      {defaultAddress && (
        <DeliveryAddressItem
          key={defaultAddress.id}
          address={defaultAddressState}
          isDefaultAddress={true}
          updateDeliveryAddress={updateDeliveryAddress}
          deleteDeliveryAddress={deleteDeliveryAddress}
        />
      )}

      {addressesState.map((address) => (
        <DeliveryAddressItem
          key={address.id}
          address={address}
          isDefaultAddress={false}
          updateDeliveryAddress={updateDeliveryAddress}
          deleteDeliveryAddress={deleteDeliveryAddress}
        />
      ))}
    </div>
  );
};

export default AddressesList;

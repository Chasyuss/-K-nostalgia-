'use client';

import { Address } from '@/types/deliveryAddress';

interface Props {
  address: Address | Address[];
  isDefaultAddress: boolean;
  updateDeliveryAddress: () => void;
  deleteDeliveryAddress: () => void;
}

const DeliveryAddressItem = ({
  address,
  isDefaultAddress,
  updateDeliveryAddress,
  deleteDeliveryAddress
}: Props) => {
  const { addressName, receiverName, phoneNumber, baseAddress, detailAddress } =
    address as Address;

  const zipCode = baseAddress.match(/\((\d+)\)/)?.[1];
  const baseAddressWithoutZipCode = baseAddress.split('(')[0];

  return (
    <div
      className={`p-4 bg-white w-full flex flex-col gap-2 border rounded-xl ${
        isDefaultAddress ? 'border-primary-20' : 'border-[#E0E0E0]'
      }`}
    >
      <div className="flex items-center gap-2">
        <p className="font-semibold text-[16px] text-label-strong">
          {addressName}
        </p>
        {isDefaultAddress && (
          <span className="px-2 py-1 text-xs border border-primary-20 text-primary-20 rounded-[6px]">
            기본 배송지
          </span>
        )}
      </div>

      <div className="space-y-1 font-medium text-[14px]">
        <p className="text-label-strong">{receiverName}</p>
        <p className="text-label-alternative">{phoneNumber}</p>
        <div className="text-label-strong">
          <div className="flex">
            {baseAddressWithoutZipCode}
            {detailAddress !== '' && <p>, {detailAddress}</p>}
          </div>
          <p>({zipCode})</p>
        </div>
      </div>

      <div className="flex items-center gap-2 font-normal text-label-normal text-[14px]">
        <button onClick={updateDeliveryAddress}>수정</button>
        <span>|</span>
        <button onClick={deleteDeliveryAddress}>삭제</button>
      </div>
    </div>
  );
};

export default DeliveryAddressItem;

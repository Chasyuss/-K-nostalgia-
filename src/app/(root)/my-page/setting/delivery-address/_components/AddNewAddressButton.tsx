import Link from 'next/link';

const AddNewAddressButton = () => {
  return (
    <Link href={'/my-page/setting/delivery-address/add-new'} className="w-full">
      <button className="w-full py-3 bg-primary-20 text-white cursor-pointer rounded-[8px]">
        새 배송지 추가
      </button>
    </Link>
  );
};

export default AddNewAddressButton;

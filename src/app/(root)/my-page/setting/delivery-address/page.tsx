// 배송지 관리 페이지

import HeaderWithInfoIcon from '@/components/common/header/_component/HeaderWithInfoIcon';

const DeliveryAddressManagement = () => {
  //헤더 info 아이콘에 전달할 툴팁 내용
  const toolTipContentArray = [''];
  return (
    <div className="max-w-md mx-auto p-4 bg-normal">
      <HeaderWithInfoIcon
        toolTipContentArray={toolTipContentArray}
        isIncludeIconHighlighting={false}
      />
    </div>
  );
};

export default DeliveryAddressManagement;

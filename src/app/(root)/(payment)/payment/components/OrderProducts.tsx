const OrderProducts = () => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-gray-600 font-bold">주문 상품</h2>
      {/* TODO 향리배송 이미지(피그마) */}
      <p className="text-sm text-gray-500 mt-2">18시 이전 주문시 {}도착</p>
      <div className="flex items-center mt-4">
        <img
          src="https://via.placeholder.com/60"
          alt="상품 이미지"
          className="w-16 h-16 rounded border"
        />
        <div className="ml-4">
          <p className="text-gray-700">복숭아</p>
          <p className="text-gray-500 text-sm">44,000원 · 1개</p>
        </div>
      </div>
    </div>
  );
};

export default OrderProducts;

const OrderSummary = () => {
  return (
    <>
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex justify-between text-gray-700 mb-2">
          <span>상품 금액</span>
          <span>44,000원</span>
        </div>
        <div className="flex justify-between text-gray-700 mb-2">
          <span>배송비</span>
          <span>2,500원</span>
        </div>
        <div className="flex justify-between text-gray-700 font-bold">
          <span>결제 금액</span>
          <span>42,500원</span>
        </div>
      </div>

      {/* 결제 버튼 */}
      <button className="w-full bg-yellow-500 text-white py-3 rounded font-bold">
        42,500원 결제하기
      </button>
    </>
  );
};

export default OrderSummary;

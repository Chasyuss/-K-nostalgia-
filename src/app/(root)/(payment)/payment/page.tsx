import PaymentHeader from './components/PaymentHeader';

const Payment = () => {
  //TODO 전화번호, 주소, 배송 요청사항 - 입력 시 USERS 테이블에 저장
  //TODO 대행사 별 결제 로직

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100">
      {/* Header */}
      <PaymentHeader />

      {/* 배송지 */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-600 font-bold">배송지</h2>
          <button className="text-blue-500 text-sm">변경</button>
        </div>
        <p className="text-gray-700 mt-2">우리집</p>
        <p className="text-gray-500 text-sm">010-0000-0000</p>
        <p className="text-gray-500 text-sm">
          경기도 성남시 분당구 정자일로 95, 1층 (13561)
        </p>
        <textarea
          className="w-full border border-gray-300 rounded mt-2 p-2 text-sm"
          placeholder="요청사항을 입력해주세요 :)"
          rows={2}
        ></textarea>
        <label className="flex items-center mt-2">
          <input type="checkbox" className="mr-2" />
          <span className="text-gray-600 text-sm">다음에도 사용할게요</span>
        </label>
      </div>

      {/* 주문 상품 */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-gray-600 font-bold">주문 상품</h2>
        <div className="flex items-center mt-4">
          <img
            src="https://via.placeholder.com/60" // 상품 이미지를 여기에 넣으세요.
            alt="상품 이미지"
            className="w-16 h-16 rounded border"
          />
          <div className="ml-4">
            <p className="text-gray-700">육회 복숭아</p>
            <p className="text-gray-500 text-sm">44,000원 · 1개</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">도착 예정일: 08/08(목)</p>
      </div>

      {/* 할인/쿠폰 */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex justify-between">
          <h2 className="text-gray-600 font-bold">할인/쿠폰</h2>
          <button className="text-blue-500 text-sm">변경</button>
        </div>
        <p className="text-gray-700 mt-2">-2,000원</p>
      </div>

      {/* 결제 수단 */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="text-gray-600 font-bold">결제 수단</h2>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input type="radio" name="payment" className="mr-2" />
            <span className="text-gray-700">토스페이</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="payment" className="mr-2" />
            <span className="text-gray-700">카카오페이</span>
          </label>
          <label className="flex items-center">
            <input type="radio" name="payment" className="mr-2" />
            <span className="text-gray-700">일반결제</span>
          </label>
        </div>
      </div>

      {/* 결제 금액 */}
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
    </div>
  );
};

export default Payment;

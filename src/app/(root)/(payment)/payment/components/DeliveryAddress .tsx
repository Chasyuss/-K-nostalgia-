const DeliveryAddress = () => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      {/* 여기부터 */}
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">배송지</h2>
        <button className="text-blue-500 text-sm">변경</button>
      </div>
      <p className="text-gray-700 mt-2">우리집</p>
      <p className="text-gray-500 text-sm">010-0000-0000</p>
      <p className="text-gray-500 text-sm">
        경기도 성남시 분당구 정자일로 95, 1층 (13561)
      </p>
      {/* 여기까지 조건부 */}

      {/* 여기부터 */}
      <textarea
        className="w-full border border-gray-300 rounded mt-2 p-2 text-sm"
        placeholder="요청사항을 입력해주세요 :)"
        rows={2}
      ></textarea>
      <label className="flex items-center mt-2">
        <input type="checkbox" className="mr-2" />
        <span className="text-gray-600 text-sm">다음에도 사용할게요</span>
      </label>
      {/* 여기까지 공통 */}
    </div>
  );
};

export default DeliveryAddress;

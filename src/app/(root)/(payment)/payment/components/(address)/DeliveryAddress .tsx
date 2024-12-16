import PlusIcon from '@/components/icons/PlusIcon';

const DeliveryAddress = () => {
  return (
    <div className="bg-white p-4 flex flex-col gap-2 rounded shadow mb-4">
      {/* 배송지 추가 */}
      {/*  배송지 추가에 유효성 검사 로직 별도로 뺄지 고려 */}
      <div className="flex flex-col justify-between items-center">
        <h2 className="w-full text-label-strong text-[18px] font-semibold pb-2">
          배송지
        </h2>

        <button className="w-full flex justify-center items-center gap-2 px-4 py-3 h-10 border-[1px] border-primary-20 text-primary-20 rounded-[8px]">
          <PlusIcon color={'#9C6D2E'} />
          {/* TODO 배송지 페이지 - 배송지 추가 페이지로 이동 (현재 pathname, zustand state 유지되어야함) */}
          <p className="font-semibold">배송지 추가하기</p>
        </button>
      </div>

      <div className="w-full h-[2px] my-1 bg-[#F2F2F2]"></div>
      <div>
        <p className="text-gray-700 mt-2">우리집</p>
        <p className="text-gray-500 text-sm">010-0000-0000</p>
        <p className="text-gray-500 text-sm">
          경기도 성남시 분당구 정자일로 95, 1층 (13561)
        </p>
      </div>
      {/* 여기까지 조건부 */}

      <hr className="h-2" />

      {/* 여기부터 */}
      {/* input formData로 받기 */}
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

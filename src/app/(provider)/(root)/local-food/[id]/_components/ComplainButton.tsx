import { useState } from 'react';

export const ComplainButton = () => {
  const [complain, setComplain] = useState(false);

  return (
    <>
      <button
        onClick={() => setComplain(true)}
        className="text-label-assistive font-normal text-sm flex items-center gap-1"
      >
        <img src="/image/complaint.png" alt="신고아이콘" />
        <p>신고하기</p>
      </button>
      {complain && <div>모달</div>}
    </>
  );
};

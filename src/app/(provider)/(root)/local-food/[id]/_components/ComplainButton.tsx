import { useState } from 'react';

export const ComplainButton = () => {
  const [complain, setComplain] = useState(false);

  return (
    <>
      <button
        onClick={() => setComplain(true)}
        className="text-label-assistive font-normal text-sm"
      >
        신고하기
      </button>
      {complain && <div>모달</div>}
    </>
  );
};

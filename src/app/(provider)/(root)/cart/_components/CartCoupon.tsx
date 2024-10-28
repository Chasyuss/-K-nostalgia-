import { useState } from 'react';
import { RadioButton } from './RadioButton';
import { CouponConfirm } from './CouponConfirm';

export const CartCoupon = () => {
  const [open, setOpen] = useState(false);
  const [showCoupon, setShowCoupon] = useState(true);
  const [couponText, setCouponText] = useState('사용 가능 쿠폰');

  const handleCouponClick = () => {
    setShowCoupon(false);
    setCouponText('쿠폰 적용 상품');
  };

  const handleBackClick = () => {
    setShowCoupon(true);
    setCouponText('사용 가능 쿠폰');
  };

  return (
    <>
      <button className="flex items-center gap-1" onClick={() => setOpen(true)}>
        <p>쿠폰 할인</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.09496 14.3472C3.90327 14.1236 3.92917 13.7869 4.15281 13.5952L10.6804 8.00014L4.15281 2.40508C3.92917 2.21339 3.90327 1.87669 4.09496 1.65305C4.28665 1.42941 4.62334 1.40351 4.84698 1.5952L11.847 7.5952C11.9652 7.69653 12.0332 7.84445 12.0332 8.00014C12.0332 8.15583 11.9652 8.30375 11.847 8.40508L4.84698 14.4051C4.62334 14.5968 4.28665 14.5709 4.09496 14.3472Z"
            fill="#545454"
          />
        </svg>
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[999] bg-[rgba(0,0,0,.24)]"
          onClick={() => setOpen(false)}
        >
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-normal rounded-[16px] w-[479px] h-[600px] z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 pb-2 border-b-2 border-[#f2f2f2]">
              {couponText === '쿠폰 적용 상품' && (
                <button onClick={handleBackClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    className="p-1"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.80038 14.6179C2.48907 14.2651 2.48907 13.7357 2.80038 13.3829L11.5504 3.46622C11.8914 3.07971 12.4812 3.04284 12.8677 3.38389C13.2543 3.72493 13.2911 4.31473 12.9501 4.70125L5.56847 13.0671H24.5002C25.0157 13.0671 25.4335 13.4849 25.4335 14.0004C25.4335 14.5159 25.0157 14.9337 24.5002 14.9337H5.56847L12.9501 23.2996C13.2911 23.6861 13.2542 24.2759 12.8677 24.6169C12.4812 24.958 11.8914 24.9211 11.5504 24.5346L2.80038 14.6179Z"
                      fill="#545454"
                    />
                  </svg>
                </button>
              )}
              <h2 className="flex-1 text-lg">{couponText}</h2>
              <button onClick={() => setOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="p-1"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.42327 3.42376C3.78776 3.05927 4.37871 3.05927 4.7432 3.42376L13.9999 12.6805L23.2566 3.42376C23.6211 3.05927 24.212 3.05927 24.5765 3.42376C24.941 3.78825 24.941 4.3792 24.5765 4.74369L15.3198 14.0004L24.5765 23.2571C24.941 23.6216 24.941 24.2125 24.5765 24.577C24.212 24.9415 23.6211 24.9415 23.2566 24.577L13.9999 15.3203L4.7432 24.577C4.37871 24.9415 3.78776 24.9415 3.42327 24.577C3.05878 24.2125 3.05878 23.6216 3.42327 23.2571L12.68 14.0004L3.42327 4.74369C3.05878 4.3792 3.05878 3.78825 3.42327 3.42376Z"
                    fill="#545454"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6 flex items-center gap-8">
              {showCoupon ? (
                <>
                  <img
                    src="https://kejbzqdwablccrontqrb.supabase.co/storage/v1/object/public/images/Coupon.png"
                    alt="2000원 할인쿠폰"
                    className="w-[23rem] cursor-pointer"
                    onClick={handleCouponClick}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.16612 25.1072C6.83066 24.7158 6.87598 24.1266 7.26735 23.7911L18.6906 13.9998L7.26735 4.2084C6.87598 3.87294 6.83066 3.28372 7.16612 2.89235C7.50158 2.50098 8.09079 2.45566 8.48216 2.79112L20.7322 13.2911C20.939 13.4684 21.0581 13.7273 21.0581 13.9998C21.0581 14.2722 20.939 14.5311 20.7322 14.7084L8.48216 25.2084C8.09079 25.5439 7.50158 25.4985 7.16612 25.1072Z"
                      fill="#74826D"
                    />
                  </svg>
                </>
              ) : (
                <RadioButton setOpen={() => setOpen(false)} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

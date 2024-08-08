import ShowBackLogo from './_component/ShowBackLogo';
import ShowSearchCart from './_component/ShowSearchCart';

type HeaderProps = {
  headerTitle?: string;
  showBackButton?: boolean;
  showLogo?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
  showComplete?: boolean;
  onCompleteClick?: () => void;
};

const Header = ({
  headerTitle,
  showBackButton = true,
  showLogo = false,
  showSearch = true,
  showCart = true,
  showComplete = false,
  onCompleteClick
}: HeaderProps) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between pt-5 pb-2 px-3 bg-normal">
      <ShowBackLogo showBackButton={showBackButton} showLogo={showLogo} />
      <div className="flex items-center text-lg font-semibold leading-[28.8px] text-nowrap">
        {headerTitle}
      </div>
      <div className="flex items-center">
        {showSearch || showCart ? (
          <ShowSearchCart showSearch={showSearch} showCart={showCart} />
        ) : null}
        {showComplete && (
          <button className="text-black" onClick={onCompleteClick}>
            완료
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

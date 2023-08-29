import { deliveryTruckIcon, globeIcon, packageIcon, shopIcon } from "../icons";

const ConfidenceBanner = () => {
  return (
    <div className="h-[40px] overflow-hidden">
      <div className="flex gap-5 md:gap-10 lg:gap-[85px] px-4 md:justify-center md:items-center overflow-y-hidden overflow-x-scroll bg-[#F9F9F9] h-[60px] items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6">{deliveryTruckIcon}</div>
          <div className="text-2 text-xs whitespace-nowrap">
            Free delivery from £xx
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6">{globeIcon}</div>
          <div className="text-2 text-xs whitespace-nowrap">
            Global Shipping
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6">{shopIcon}</div>
          <div className="text-2 text-xs whitespace-nowrap">
            Pickup & Collect
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6">{packageIcon}</div>
          <div className="text-2 text-xs whitespace-nowrap">
            Lorem Ipsum Dolor amet
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceBanner;

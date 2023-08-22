import { deliveryTruckIcon, globeIcon, shopIcon } from "../icons";

const ConfidenceBanner = () => {
  return (
    <div className="flex gap-4 px-4 justify-center overflow-auto bg-[#F9F9F9] h-10 items-center">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6">{deliveryTruckIcon}</div>
        <div className="text-2 text-xs whitespace-nowrap">
          Free delivery from £xx
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6">{globeIcon}</div>
        <div className="text-2 text-xs whitespace-nowrap">Global Shipping</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-6 h-6">{shopIcon}</div>
        <div className="text-2 text-xs whitespace-nowrap">Pickup & Collect</div>
      </div>
    </div>
  );
};

export default ConfidenceBanner;

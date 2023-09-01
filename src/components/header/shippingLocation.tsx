"use client";
import { downArrowIcon } from "@/components/icons";
import { useState, useEffect, useRef, useContext, use } from "react";
import { ShippingLocationProps } from "@/lib/types";
import { GlobalContext } from "@/context/globalProviderModal";

const ShippingLocation = ({
  shippingLocations,
}: {
  shippingLocations: ShippingLocationProps[];
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showCountrySelection, setShowCountrySelection] = useState(false);
  const { changeShippingLocation, activeShippingLocation } =
    useContext(GlobalContext);

  const activeCountry = shippingLocations.find(
    (location) => location.countryCode === activeShippingLocation
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowCountrySelection(false);
      }
    };
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-20 hidden md:flex items-center gap-2"
    >
      <div className="whitespace-nowrap">Ship to</div>
      <div
        onClick={() => setShowCountrySelection((prev) => !prev)}
        className="rounded bg-[#F8F8F9] flex cursor-pointer items-center gap-2 p-2 justify-between"
      >
        <div
          className="w-10 h-5"
          dangerouslySetInnerHTML={{
            __html: activeCountry?.flag || "",
          }}
        />
        <div>{downArrowIcon}</div>
      </div>
      {showCountrySelection && (
        <div
          style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 90px" }}
          className="absolute overflow-auto px-6 py-8 border rounded -left-32 top-12 w-[416px] h-[417px] bg-white"
        >
          <div className="font-medium text-2xl">Shipping worldwide!</div>
          <div className="mt-2">
            Currently shipping to <b>{activeCountry?.countryName}</b>
          </div>
          <div className="mt-2">
            Order will be billed in{" "}
            <b>
              {activeCountry?.currencyCode &&
                `${activeCountry.currencyCode} ${activeCountry.symbol}`}
            </b>
          </div>
          <div className="w-full flex mt-4 flex-col gap-2">
            {shippingLocations.map((location) => {
              return (
                <div
                  key={location.countryCode}
                  onClick={() => {
                    changeShippingLocation(location.countryCode);
                  }}
                  className={`w-full cursor-pointer p-4 flex items-center justify-between ${
                    activeCountry?.countryCode === location.countryCode
                      ? "bg-[#003459] text-white"
                      : "bg-[#F8F8F9]"
                  }`}
                >
                  <div className="flex gap-4 h-5">
                    <div
                      className="w-[35px] h-5"
                      dangerouslySetInnerHTML={{
                        __html: location.flag || "",
                      }}
                    />
                    <div>{location.countryName}</div>
                  </div>
                  <div className="font-bold w-14 text-left">
                    {location.currencyCode} {location.symbol}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingLocation;

"use client";
import { useContext } from "react";
import { GlobalContext } from "../context/globalProvider";

const ErrorMsg = () => {
  const { error, setError } = useContext(GlobalContext);
  return (
    error && (
      <div>
        <div className="fixed z-40 w-full h-full top-0 left-0 bg-black opacity-50"></div>
        <div
          className="fixed flex flex-col justify-between bg-white z-50 w-[400px] min-h-[200px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#202020] p-4 rounded-md"
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        >
          <div className="h-full p-4">{error}</div>
          <div className="flex justify-end">
            <div
              className="bg-blue-600 cursor-pointer bottom-0 rounded w-fit text-white font-bold text-xl py-1 shadow-md px-4"
              onClick={() => {
                setError("");
              }}
            >
              Close
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ErrorMsg;

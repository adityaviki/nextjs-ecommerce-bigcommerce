import React, { ReactNode, useState } from "react";
import { minusIcon, plusIcon } from "./icons";

const AccordionItem = ({
  title,
  content,
}: {
  title: ReactNode;
  content: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <div className={isOpen ? "" : "border-b-2 border-[#DBDADA]"}>
        <div
          className={`flex items-center p-2 justify-between cursor-pointer ${
            isOpen ? "border-b border-[#003459]" : ""
          }`}
          onClick={toggleAccordion}
        >
          <div className={`text-[#313131]`}>{title}</div>
          <div>{isOpen ? minusIcon : plusIcon}</div>
        </div>
        {isOpen && <div className="px-2 text-[#3B4353] py-4">{content}</div>}
      </div>
    </div>
  );
};

export default AccordionItem;

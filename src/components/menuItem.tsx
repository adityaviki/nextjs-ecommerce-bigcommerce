import React, { ReactNode, useState } from "react";

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
    <div className="w-full p-2">
      <div className={isOpen ? "" : "border-b border-[#DBDADA]"}>
        <div
          className={`flex items-center justify-between cursor-pointer p-4 ${
            isOpen ? "border-b border-[#003459]" : ""
          }`}
          onClick={toggleAccordion}
        >
          <div className={`text-lg text-[#313131]`}>{title}</div>
        </div>
        {isOpen && <div className="p-4">{content}</div>}
      </div>
    </div>
  );
};

export default AccordionItem;

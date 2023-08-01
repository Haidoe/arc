import { useState } from "react";
import Button from "./Button";
import InformationModal from "./global/InformationModal";

const DownloadReportButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        className="min-w-[240px] text-base"
        onClick={() => setIsOpen(true)}
      >
        Download Report
      </Button>

      {isOpen && (
        <InformationModal
          heading={"Future Feature"}
          message={"This feature will be live in the coming future"}
          closeModalHandler={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default DownloadReportButton;

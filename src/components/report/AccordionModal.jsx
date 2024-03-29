import { useState } from "react";
import Modal from "~/components/Modal";
import Accordion from "~/components/report/Accordion";

// by default the modal is closed and readOnlyState is true

const AccordionModal = ({ title, children, defaultOpen, modalWidth }) => {

  const [isOpen, setIsOpen] = useState(false);
  
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleAccordionPanelClick = () => {
    openModal();
  }

  const modalWidthObj = {
    50: "w-[50vw] mx-[-25vw]",
    75: "w-[75vw] mx-[-37.5vw]",
    90: "w-[90vw] mx-[-45vw]"
  };

  const modalWidthClass = modalWidthObj[modalWidth] || "";

  return (
    <>
      {/* Accordion in Modal */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className={modalWidthClass}>
          <Accordion
            title={"dafadfdasf"}
            defaultOpen={true}
            readOnlyState={false}
            onClose={true}
            insideModal={true}
            tita={"nuts"}
            
          >
            {children}
          </Accordion>
        </div>
      </Modal>

      {/* Accordion without Modal */}
      <Accordion
        title={"dafafads"}
        defaultOpen={defaultOpen}
        readOnlyState={true}
        onClose={true}
        tita={"nuts"}
        panelClick={handleAccordionPanelClick}
      >
        {children}
      </Accordion>
    </>
  );
};


export default AccordionModal;
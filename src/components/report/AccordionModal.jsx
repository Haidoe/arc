import Modal from "~/components/Modal";
import Accordion from "~/components/report/Accordion";
import { useState } from "react";

// by default the modal is closed and readOnlyState is true

const AccordionModal = ({ title, children, defaultOpen }) => {

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

  return (
    <>
      {/* Accordion in Modal */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Accordion
          title={title}
          defaultOpen={true}
          readOnlyState={false}
          insideModal={true}
        >
          {children}
        </Accordion>
      </Modal>

      {/* Accordion without Modal */}
      <Accordion
        title={title}
        defaultOpen={defaultOpen}
        readOnlyState={true}
        panelClick={handleAccordionPanelClick}
      >
        {children}
      </Accordion>
    </>
  );
};


export default AccordionModal;
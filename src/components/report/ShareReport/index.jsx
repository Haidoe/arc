import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import EmailRow from "./RowEmail";
import CopyLinkButton from "./CopyLinkBtn";
import ShareReportForm from "./Form";
import Image from "next/image";

const ShareReportButton = ({ productionInfo }) => {
  const data = useSelector((state) => state.productionReport.data);
  const [isOpen, setIsOpen] = useState(false);
  const [emails, setEmails] = useState([]);

  const addEmail = (email) => {
    const newEmails = [...emails];
    newEmails.push({ email, id: emails.length });
    setEmails(newEmails);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}> Share Report </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-full min-w-[320px] max-w-[500px]"
      >
        <div className="p-4 text-contrast-dark">
          <header className="flex items-center justify-between border-b-[1.5px] pb-4">
            <h3 className="text-base"> Share Production Report </h3>
            <button onClick={() => setIsOpen(false)}>
              <Image
                src="/images/icons/close.svg"
                width={16}
                height={16}
                alt="close icon"
              />
            </button>
          </header>

          <div className="mb-4 border-b-[1.5px] py-4">
            <ShareReportForm
              addEmail={addEmail}
              data={data}
              productionInfo={productionInfo}
            />

            {emails.length > 0 && (
              <div className="mb-4 mt-8 flex flex-col gap-4">
                {emails.map((email) => (
                  <EmailRow
                    key={email.id}
                    email={email.email}
                    reportId={data.id}
                    productionTitle={productionInfo.title}
                  />
                ))}
              </div>
            )}
          </div>

          <footer className="flex items-center justify-end">
            <CopyLinkButton id={data.id} />
          </footer>
        </div>
      </Modal>
    </>
  );
};

export default ShareReportButton;

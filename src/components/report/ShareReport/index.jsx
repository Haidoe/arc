import Image from "next/image";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import sendReport from "~/service/send-mail";
import getURL from "~/helper/helper";
import { useSelector } from "react-redux";
import Button from "~/components/Button";
import Modal from "~/components/Modal";
import TextInputField from "~/components/TextInputField";
import LoadingSpinner from "~/components/Loading";

dayjs.extend(LocalizedFormat);

const ShareReportButton = ({ prodData }) => {
  const data = useSelector((state) => state.productionReport.data);
  const [isOpen, setIsOpen] = useState(false);
  const [emails, setEmails] = useState([]);

  const [isInviteLoading, setIsInviteLoading] = useState(true);

  const formRef = useRef(null);
  const emailRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = dayjs().format("LL");
    const subj = `${
      prodData.title ?? ""
    } | Production Progress Report as of ${today}`;

    const contentUrl = getURL(`/view/${data.id ?? ""}`);

    setIsInviteLoading(true);

    await sendReport(emailRef.current.value, subj, contentUrl);

    setTimeout(() => {
      setIsInviteLoading(false);
    }, 300);

    const newEmails = [...emails];
    newEmails.push({ email: emailRef.current.value, id: emails.length });
    setEmails(newEmails);

    formRef.current.reset();
  };

  async function copyContent() {
    try {
      const contentUrl = getURL(`/view/${data.id ?? ""}`);
      await navigator.clipboard.writeText(contentUrl);
      console.log("Content copied to clipboard");
      /* Resolved - text copied to clipboard successfully */
    } catch (err) {
      console.error("Failed to copy: ", err);
      /* Rejected - text failed to copy to the clipboard */
    }
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}> Share Report </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="w-full max-w-[500px]"
      >
        <div className="p-4">
          <header className="flex items-center justify-between border-b-[1.5px] pb-4">
            <h3 className="text-base"> Share Production Report </h3>
            <button onClick={() => setIsOpen(false)}> X </button>
          </header>

          <div className="mb-4 border-b-[1.5px] py-4">
            <form className="flex gap-3" onSubmit={handleSubmit} ref={formRef}>
              <TextInputField
                inputType="Border"
                label="Email"
                type="email"
                placeholder=" "
                required
                ref={emailRef}
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              />

              {isInviteLoading ? (
                <Button disabled>
                  <LoadingSpinner size={20} />
                </Button>
              ) : (
                <Button
                  buttonType="Primary"
                  className=" flex items-center text-base"
                  type="submit"
                >
                  Invite
                </Button>
              )}
            </form>

            {emails.length > 0 && (
              <div className="mb-4 mt-8 flex flex-col gap-4">
                {emails.map((email) => {
                  return (
                    <div
                      key={email.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          alt="Gradient Generic Avatar"
                          src="/images/icons/gradient-avatar.svg"
                          height={32}
                          width={32}
                        />

                        <p>{email.email}</p>
                      </div>

                      <button className="underline">Resend</button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <footer className="flex items-center justify-end">
            <button onClick={copyContent}>Copy Link</button>
          </footer>
        </div>
      </Modal>
    </>
  );
};

export default ShareReportButton;

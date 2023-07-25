import { useRef, useState } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import Button from "~/components/Button";
import LoadingSpinner from "~/components/Loading";
import TextInputField from "~/components/TextInputField";
import getURL from "~/helper/helper";
import sendReport from "~/service/send-mail";
import Image from "next/image";

dayjs.extend(LocalizedFormat);

const ShareReportForm = ({ addEmail, productionInfo, data }) => {
  const formRef = useRef(null);
  const emailRef = useRef(null);

  const [isInviteLoading, setIsInviteLoading] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = dayjs().format("LL");
    const subj = `${
      productionInfo.title ?? ""
    } | Production Progress Report as of ${today}`;

    const contentUrl = getURL(`/view/${data.id ?? ""}`);

    setIsInviteLoading(true);

    await sendReport(emailRef.current.value, subj, contentUrl);

    setIsInviteLoading(false);

    setIsCooldown(true);

    setTimeout(() => {
      setIsCooldown(false);
    }, 3000);

    addEmail(emailRef.current.value);

    formRef.current.reset();
  };

  return (
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
        <button
          type="button"
          className="rounded-[5px] border-primary-base bg-primary-base px-4 py-2 text-white hover:border-primary-base hover:bg-primary-base active:border-primary-base active:bg-primary-base"
        >
          <LoadingSpinner size={20} />
        </button>
      ) : isCooldown ? (
        <button
          type="button"
          className="rounded-[5px] border-secondary-dark bg-secondary-dark px-2 py-2 text-white hover:border-secondary-dark hover:bg-secondary-dark active:border-secondary-dark active:bg-secondary-dark"
        >
          <div className="flex gap-2">
            Sent
            <span className="flex w-4 justify-center">
              <Image
                src="/images/icons/check.svg"
                width={12}
                height={12}
                alt="check mark icon"
              />
            </span>
          </div>
        </button>
      ) : (
        <button className="rounded-[5px] border-primary-base bg-primary-base px-4 py-2 text-white hover:border-primary-base hover:bg-primary-base active:border-primary-base active:bg-primary-base">
          Invite
        </button>
      )}
    </form>
  );
};

export default ShareReportForm;

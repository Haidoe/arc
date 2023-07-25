import { useRef, useState } from "react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import Button from "~/components/Button";
import LoadingSpinner from "~/components/Loading";
import TextInputField from "~/components/TextInputField";
import getURL from "~/helper/helper";
import sendReport from "~/service/send-mail";

dayjs.extend(LocalizedFormat);

const ShareReportForm = ({ addEmail, productionInfo, data }) => {
  const formRef = useRef(null);
  const emailRef = useRef(null);

  const [isInviteLoading, setIsInviteLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = dayjs().format("LL");
    const subj = `${
      productionInfo.title ?? ""
    } | Production Progress Report as of ${today}`;

    const contentUrl = getURL(`/view/${data.id ?? ""}`);

    setIsInviteLoading(true);

    await sendReport(emailRef.current.value, subj, contentUrl);

    setTimeout(() => {
      setIsInviteLoading(false);
    }, 300);

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
  );
};

export default ShareReportForm;

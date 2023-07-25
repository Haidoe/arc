import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import Image from "next/image";
import { useState } from "react";

import LoadingSpinner from "~/components/Loading";
import getURL from "~/helper/helper";
import sendReport from "~/service/send-mail";

dayjs.extend(LocalizedFormat);

const EmailRow = ({ email, productionTitle, reportId }) => {
  const [isResending, setIsResending] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false);

  const handleResend = async () => {
    const today = dayjs().format("LL");

    const subj = `${productionTitle} | Production Progress Report as of ${today}`;

    const contentUrl = getURL(`/view/${reportId}`);

    setIsResending(true);

    await sendReport(email, subj, contentUrl);

    setIsResending(false);

    setIsCooldown(true);

    setTimeout(() => {
      setIsCooldown(false);
    }, 3000);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          alt="Gradient Generic Avatar"
          src="/images/icons/gradient-avatar.svg"
          height={32}
          width={32}
        />

        <p>{email}</p>
      </div>

      {isResending ? (
        <button>
          <LoadingSpinner />
        </button>
      ) : isCooldown ? (
        <p> Sent </p>
      ) : (
        <button className="underline" onClick={handleResend}>
          Resend
        </button>
      )}
    </div>
  );
};

export default EmailRow;

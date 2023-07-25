import Image from "next/image";

const EmailRow = ({ email }) => {
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

      <button className="underline">Resend</button>
    </div>
  );
};

export default EmailRow;

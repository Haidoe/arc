import Image from "next/image";

type ListItemProps = {
  theme?: "primary" | null;
};

const DefaultAvatar = (props: ListItemProps) => {
  return (
    <div className="m-0 h-[88px] w-[88px] overflow-hidden rounded-full bg-primary-base shadow-3xl">
      {props.theme === "primary" && (
        <Image
          src="/images/default-production-avatar.png"
          alt="Default production avatar"
          width={88}
          height={88}
        />
      )}

      <span className="sr-only">Default production avatar</span>
    </div>
  );
};

export default DefaultAvatar;

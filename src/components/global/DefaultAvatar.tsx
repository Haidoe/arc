import Image from "next/image";

type ListItemProps = {
  theme?: "primary" | null;
  imgURL?: string | null;
};

const DefaultAvatar = (props: ListItemProps) => {
  return (
    <div className="relative m-0 h-[88px] w-[88px] overflow-hidden rounded-full bg-primary-base shadow-3xl">
      {props.theme === "primary" && (
        <Image
          src={props.imgURL ?? "/images/default-production-avatar.png"}
          alt="Default production avatar"
          layout="fill"
          objectFit="cover"
        />
      )}

      <span className="sr-only">Default production avatar</span>
    </div>
  );
};

export default DefaultAvatar;

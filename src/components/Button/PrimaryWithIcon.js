import Image from "next/image";

const PrimaryWithIcon = ({ label, icon }) => {
  return (
    <button className="button active-border-primary-dark flex gap-2 border-2 border-primary-base bg-primary-base text-white shadow-lg hover:border-primary-light hover:bg-primary-light hover:shadow-primary-base/50 active:border-primary-dark active:bg-primary-dark active:shadow-inner">
      {label}
      <Image src={icon} width={24} height={24} alt="Add icon" />
    </button>
  );
};
export default PrimaryWithIcon;

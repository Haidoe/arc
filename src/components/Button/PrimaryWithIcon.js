import Image from "next/image";

const PrimaryWithIcon = ({ icon, className, children, onClick }) => {
  return (
    <button
      className={`button active-border-primary-dark flex gap-2 border-[1.5px] border-primary-base bg-primary-base px-4 py-2 font-bold text-white shadow-lg hover:border-primary-light hover:bg-primary-light hover:shadow-primary-base/50 active:border-primary-dark active:bg-primary-dark active:shadow-inner lg:px-8 lg:py-3 ${className} `}
      onClick={onClick}
    >
      {children}
      <Image src={icon} width={24} height={24} alt="Add icon" />
    </button>
  );
};
export default PrimaryWithIcon;

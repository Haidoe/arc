// import AddIcon from "~/assets/icons/add.svg";
//import Icon

import Image from "next/image";

const BorderWithIcon = ({ label, name, value, onChange, icon }) => {
  return (
    <div>
      <div className="relative h-12 w-full min-w-[160px]">
        <div class="absolute right-3 top-2/4 grid h-6 w-6 -translate-y-2/4 place-items-center">
          <Image src={icon} alt="Add Icon" />
        </div>
        <input
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          type="text"
          placeholder=" "
          className="text-input-border-icon-input peer"
        />
        <label
          className="before:content[' '] after:content[' '] text-input-border-icon-label"
          htmlFor={name}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default BorderWithIcon;

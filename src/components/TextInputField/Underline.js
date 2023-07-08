const Underline = ({ label, name, value, onChange, isError, className }) => {
  return (
    <div className="relative h-12 w-full min-w-[160px]">
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type="text"
        placeholder=" "
        className={`text-input-underline-input peer ${
          isError ? "underline-input-error" : ""
        } ${className}`}
      />
      <label
        className={`before:content[' '] after:content[' '] text-input-underline-label ${
          isError ? "underline-label-error" : ""
        }`}
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
};

export default Underline;

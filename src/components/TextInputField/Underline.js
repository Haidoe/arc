const Underline = ({ label, name, value, onChange, isError }) => {
  return (
    <div>
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
          }`}
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
    </div>
  );
};

export default Underline;

const Border = ({ label, name, value, onChange, isError, className }) => {
  return (
    <div className={`relative h-12 w-full min-w-[160px] ${className ?? ""}`}>
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={name}
        type="text"
        placeholder=" "
        className={`text-input-border-input peer ${
          isError ? "input-error" : ""
        }`}
      />
      <label
        className={`before:content[' '] after:content[' '] text-input-border-label ${
          isError ? "label-error" : ""
        }`}
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
};

export default Border;

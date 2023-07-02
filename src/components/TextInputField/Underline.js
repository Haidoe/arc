const Underline = ({ label, name, value, onChange }) => {
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
          className="text-input-underline-input peer"
        />
        <label
          className="before:content[' '] after:content[' '] text-input-underline-label"
          htmlFor={name}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default Underline;

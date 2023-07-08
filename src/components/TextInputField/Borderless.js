const Borderless = ({ name, value, onChange, className }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      name={name}
      id={name}
      type="text"
      placeholder=" "
      className={`text-input-borderless-input peer ${className}`}
    />
  );
};

export default Borderless;

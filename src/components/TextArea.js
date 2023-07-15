const TextArea = ({ name, value, placeholder, onChange, className }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      name={name}
      id={name}
      type="text"
      placeholder={placeholder}
      className={`h-[100px] w-[400px] resize rounded-[4px] border border-primary-dark text-sm text-primary-dark placeholder-primary-light outline-none placeholder:text-[12px] focus:border-2 focus:border-primary-dark ${className}`}
    />
  );
};

export default TextArea;

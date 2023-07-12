//create time input field component for the form with onChange event handler
const TimeInputField = ({
  name,
  value,
  onChange,
  className,
  isReadyOnly,
  ref,
}) => {
  return (
    <div>
      <input
        type="time"
        name={name}
        value={value}
        onChange={onChange}
        className={`rounded-[5px] border-[1px] border-contrast-light bg-arc px-2 text-[12px] text-hyperlink before:text-inherit ${className} focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-hyperlink `}
        readOnly={isReadyOnly}
        ref={ref}
      />
    </div>
  );
};

export default TimeInputField;

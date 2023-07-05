//create time input field component for the form with onChange event handler
const TimeInputField = ({ name, value, onChange, className }) => {
  return (
    <div>
      <input
        type="time"
        name={name}
        value={value}
        onChange={onChange}
        className={` rounded-[5px] border-[1px] border-contrast-light bg-arc px-6 text-[12px] text-hyperlink ${className} focus:border-transparent focus:outline-none focus:ring-[1px] focus:ring-hyperlink `}
      />
    </div>
  );
};

export default TimeInputField;

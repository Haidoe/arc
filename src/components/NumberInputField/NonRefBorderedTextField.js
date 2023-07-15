const NonRefBorderedTextField = (props) => {
  return (
    <div
      className={`relative h-12 w-full min-w-[160px] ${props.className ?? ""}`}
    >
      <input
        value={props.value}
        onChange={props.onChange}
        name={props.name}
        id={props.name}
        type="number"
        placeholder=" "
        className={`text-input-border-input peer text-sm text-contrast-dark ${
          props.isError ? "input-error" : ""
        }`}
        defaultValue={props.defaultValue}
      />
      <label
        className={`before:content[' '] after:content[' '] text-input-border-label ${
          props.isError ? "label-error" : ""
        }`}
        htmlFor={props.name}
      >
        {props.label}
      </label>
    </div>
  );
};

export default NonRefBorderedTextField;

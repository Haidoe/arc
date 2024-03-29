const Disabled = ({ children, onClick, className }) => {
  return (
    <button
      className={`button border-[1.5px] border-contrast-dark bg-contrast-light px-4 py-2 text-sm font-bold text-contrast-dark lg:px-8 lg:py-3 lg:text-base ${className} `}
      onClick={onClick}
      disabled
    >
      {children}
    </button>
  );
};
export default Disabled;

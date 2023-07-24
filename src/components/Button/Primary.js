const Primary = ({ children, onClick, className, disabled }) => {
  return (
    <button
      className={`button active-border-primary-base border-[1.5px] border-primary-base bg-primary-base px-4 py-2 font-bold text-white hover:border-primary-light hover:bg-primary-light hover:shadow-primary-base/50 active:border-primary-base active:bg-primary-base active:shadow-inner lg:px-8 lg:py-3 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Primary;

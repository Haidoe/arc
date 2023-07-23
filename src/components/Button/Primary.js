const Primary = ({ children, onClick, className }) => {
  return (
    <button
      className={`button active-border-primary-base border border-primary-base bg-primary-base text-white shadow-lg hover:border-primary-light hover:bg-primary-light hover:shadow-primary-base/50 active:border-primary-base active:bg-primary-base active:shadow-inner ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Primary;

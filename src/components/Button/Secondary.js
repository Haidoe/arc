const Secondary = ({ children, onClick, className }) => {
  return (
    <button
      className={`button border border-primary-base bg-white text-sm text-primary-base hover:shadow-lg active:bg-primary-light active:text-white ${className} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Secondary;

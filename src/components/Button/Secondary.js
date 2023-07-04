const Secondary = ({ children, onClick, className }) => {
  return (
    <button
      className={`button border-2 border-primary-dark bg-white text-primary-dark hover:shadow-lg active:bg-primary-light active:text-white ${className} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Secondary;
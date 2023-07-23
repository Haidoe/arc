const Secondary = ({ children, onClick, className }) => {
  return (
    <button
      className={`button border-[1.5px] border-primary-light bg-white px-4 py-2 text-sm font-bold text-primary-light hover:shadow-lg active:bg-primary-light active:text-white lg:px-8 lg:py-3 ${className} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Secondary;

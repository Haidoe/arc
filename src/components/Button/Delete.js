const Delete = ({ className, children, onClick }) => {
  return (
    <button
      className={`button bg-error px-4 py-2 text-sm font-bold text-white hover:bg-errorLight hover:shadow-lg hover:shadow-error/50 active:bg-errorDark active:shadow-error/40 lg:px-8 lg:py-3 lg:text-base ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Delete;

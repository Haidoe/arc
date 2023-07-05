const Delete = ({ className, children, onClick }) => {
  return (
    <button
      className={`button bg-error px-6 text-white hover:bg-errorLight hover:shadow-lg hover:shadow-error/50 active:bg-errorDark active:shadow-error/40 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Delete;

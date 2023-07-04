const Primary = ({ label }) => {
  return (
    <div>
      <button className="button active-border-primary-dark border-2 border-primary-base bg-primary-base text-white shadow-lg hover:border-primary-light hover:bg-primary-light hover:shadow-primary-base/50 active:border-primary-dark active:bg-primary-dark active:shadow-inner">
        {label}
      </button>
    </div>
  );
};
export default Primary;

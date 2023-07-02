const testApi = () => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: "6490af962e9b95919cc3e3ff",
      productionId: "1111111",
    }),
  };

  const handleClick = () => {
    //pointing to local api
    fetch("/api/user/productions", config);
  };

  return (
    <div>
      <InputText />
      <button
        onClick={handleClick}
        className="m-4 rounded-lg border border-slate-800 bg-gray-500 px-4 py-2 hover:bg-gray-600"
      >
        testApit
      </button>
    </div>
  );
};

export default testApi;

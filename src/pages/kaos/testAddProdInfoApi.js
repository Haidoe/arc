import SampleProductionInfo from "~/jsons/sample_productionInfo.json" assert { type: "json" };

const testAddProdInfoApi = () => {
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productionInfo: SampleProductionInfo,
    }),
  };

  const handleClick = () => {
    //pointing to local api
    fetch("/api/production/addProductionDemo", config);
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="m-4 rounded-lg border border-slate-800 bg-gray-500 px-4 py-2 hover:bg-gray-600"
      >
        Add Production Info
      </button>
    </div>
  );
};

export default testAddProdInfoApi;

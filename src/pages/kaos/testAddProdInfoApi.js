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
    <div className="m-4">
      <h1 className="text-2xl font-bold">Test Add Production Info Api</h1>
      <p className="text-lg font-semibold">
        This api is used to add production info to a production
      </p>
      <p className="text-lg">Fetch from /api/production/addProductionDemo</p>
      <p className="text-lg">Body from sample_productionInfo.json</p>

      <button
        onClick={handleClick}
        className="mt-4 rounded-lg border border-slate-800 bg-gray-500 px-4 py-2 hover:bg-gray-600"
      >
        Add Production Info
      </button>
    </div>
  );
};

export default testAddProdInfoApi;

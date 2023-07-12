import Button from "~/components/Button";

const ScenesShotForm = () => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="mb-8 w-full min-w-[1000px] border-separate border-spacing-2">
          <thead>
            <tr className="text-base">
              <th className="w-[50px]">Scene</th>
              <th className="w-[200px] text-left">Set</th>
              <th className="w-[300px] text-left">Location</th>
              <th>Cast</th>
              <th>D/N</th>
              <th>Pages</th>
              <th>Pgs Shot</th>
              <th>Pgs Today</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="bg-primary-light text-right text-backgroundArc">
                1
              </td>
              <td className="bg-primary-light p-1 text-backgroundArc">Set</td>
              <td className="bg-primary-light p-1 text-backgroundArc">
                Location
              </td>
              <td className="bg-primary-light p-1 text-backgroundArc">Cast</td>
              <td className="bg-primary-light p-1 text-backgroundArc">D/N</td>
              <td className="bg-primary-light p-1 text-backgroundArc">Pages</td>
              <td className="bg-primary-light p-1 text-backgroundArc">
                Pgs Shot
              </td>
              <td className="bg-primary-light p-1 text-backgroundArc">
                Pgs Today
              </td>
            </tr>

            <tr>
              <td className="bg-primary-light text-right text-backgroundArc">
                2
              </td>
              <td className="bg-primary-light p-1 text-backgroundArc">Set</td>
              <td className="bg-primary-light p-1 text-backgroundArc">
                Location
              </td>
              <td className="bg-primary-light p-1 text-backgroundArc">Cast</td>
              <td className="bg-primary-light p-1 text-backgroundArc">D/N</td>
              <td className="bg-primary-light p-1 text-backgroundArc">Pages</td>
              <td className="bg-primary-light p-1 text-backgroundArc">
                Pgs Shot
              </td>
              <td className="bg-primary-light p-1 text-backgroundArc">
                Pgs Today
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <div className="flex items-end gap-2 text-xs">
          <div>Naming conventions</div>
          <div>D/N: Day /Night</div>
        </div>
        <div>
          <Button buttonType="Secondary" className="p-2">
            <span className="text-sm"> Create New Line </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScenesShotForm;

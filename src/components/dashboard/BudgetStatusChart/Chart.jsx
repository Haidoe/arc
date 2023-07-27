import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// constants
const CUSTOM_LEGENDS = {
  Good: "#ACEC8D",
  Warning: "#EDE67E",
  Danger: "#CA3E3E"
};

const BudgetStatusChart = ({ details }) => {
  const projectProgress = Math.floor(details.projectProgress);
  const remainingProgress = 100 - projectProgress;

  const getGradient = (chart) => {
    const {
      ctx,
      chartArea: { right },
    } = chart;

    // const gradientSegment = ctx.createLinearGradient(180, -50, 0, 20);
    const gradientSegment = ctx.createLinearGradient(right, 0, 0, 0);

    if (details.finishRateAvg <= 80) {
      gradientSegment.addColorStop(0.6, CUSTOM_LEGENDS.Good);
    } else if (details.finishRateAvg <= 100) {
      gradientSegment.addColorStop(0.6, CUSTOM_LEGENDS.Warning);
    } else {
      gradientSegment.addColorStop(0.6, CUSTOM_LEGENDS.Danger);
    }

    gradientSegment.addColorStop(0.9, "#6A6AC6");

    return gradientSegment;
  };

  const data = {
    labels: ["Progress of the production", "Remaining progress"],
    datasets: [
      {
        label: "",
        data: [projectProgress, remainingProgress],

        backgroundColor: (context) => {
          const chart = context.chart;

          const { ctx, chartArea } = chart;

          if (!chartArea) return null;

          if (context.dataIndex === 0) {
            return getGradient(chart);
          }

          return "transparent";
        },
        borderWidth: 0,
        cutout: "60%",
        borderRadius: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    rotation: -90,
    circumference: 180,
    layout: {
      padding: 0,
    },
  };

  const backgroundCircle = {
    id: "budgetStatusBgCircle",
    beforeDatasetsDraw(chart, args, options) {
      const { ctx } = chart;
      ctx.save();
      ctx.beginPath();
      const xCoor = chart.getDatasetMeta(0).data[0].x;
      const yCoor = chart.getDatasetMeta(0).data[0].y;
      const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius;
      const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius;
      const width = outerRadius - innerRadius;
      const angle = Math.PI;
      ctx.arc(xCoor, yCoor, outerRadius - width / 2, 0, angle, true);
      ctx.strokeStyle = "#DADAF4";
      ctx.lineWidth = width;
      ctx.stroke();
      ctx.font = "bold 20px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000";
      ctx.fillText(`${projectProgress} %`, xCoor, yCoor);
    },
  };

  return (
    <div className="flex-col flex">
      <Doughnut data={data} options={options} plugins={[backgroundCircle]} />

      <div className="legend-section flex flex-row gap-2 justify-evenly">
        {/* loop throught custom legends */}
        {Object.keys(CUSTOM_LEGENDS).map((key, idx) => (

          <div key={idx}  className="flex flex-row items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: CUSTOM_LEGENDS[key] }}
            ></div>
            <p className="text-s">{key}</p>
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default BudgetStatusChart;

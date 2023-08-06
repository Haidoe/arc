import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// constants
const CUSTOM_LEGENDS = {
  Good: "#ACEC8D",
  Warning: "#EDE67E",
  Danger: "#CA3E3E",
};

const BudgetStatusChart = ({ details }) => {
  const chartRef = useRef(null);

  // display consumed hours
  const consumedHours = `${details.totalHoursUsed}/${details.totalHours} hours`;

  const projectProgress = Math.floor(details.projectProgress);
  const remainingProgress = 100 - projectProgress;

  const getGradient = (chart) => {
    const {
      ctx,
      chartArea: { right },
    } = chart;

    // const gradientSegment = ctx.createLinearGradient(180, -50, 0, 20);
    const gradientSegment = ctx.createLinearGradient(right, 0, 0, 0);

    // 100% to 110% = Green
    // 111% to 125% = Yellow
    // Over 126% = Red

    if (details.statusRate > 125) {
      gradientSegment.addColorStop(0.6, CUSTOM_LEGENDS.Danger);
    } else if (details.statusRate <= 125 && details.statusRate > 110) {
      gradientSegment.addColorStop(0.6, CUSTOM_LEGENDS.Warning);
    } else {
      gradientSegment.addColorStop(0.6, CUSTOM_LEGENDS.Good);
    }

    gradientSegment.addColorStop(0.1, "#6A6AC6");

    return gradientSegment;
  };

  const data = {
    labels: ["Progress of the production", "Remaining progress"],
    datasets: [
      {
        label: "Percentage:",
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
        cutout: "85%",
        borderRadius: 0,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    rotation: -90,
    circumference: 180,
  };

  useEffect(() => {
    // ChartJS.pluginService.register(backgroundCircle);
    console.log(chartRef.current.update());
  });

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
      ctx.font = "bold 30px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#495367";
      // fill percentage text in center
      ctx.fillText(`${projectProgress}%`, xCoor, yCoor - 35);

      ctx.font = "16px Arial";
      ctx.fillStyle = "#696969";
      ctx.fillText(`${consumedHours}`, xCoor, yCoor - 5);
    },
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="relative w-full">
        <Doughnut
          height={225}
          ref={chartRef}
          data={data}
          options={options}
          plugins={[backgroundCircle]}
        />
      </div>

      <div className="mt-4 flex justify-center gap-4 pt-4">
        {/* loop throught custom legends */}
        {Object.keys(CUSTOM_LEGENDS).map((key, idx) => (
          <div key={idx} className="flex flex-row items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
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

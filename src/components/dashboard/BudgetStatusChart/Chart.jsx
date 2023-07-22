import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetStatusChart = ({ details }) => {
  const projectProgress = Math.floor(details.projectProgress);
  const remainingProgress = 100 - projectProgress;

  const getGradient = (chart) => {
    const {
      ctx,
      chartArea: { top, bottom, left, right },
    } = chart;

    // const gradientSegment = ctx.createLinearGradient(180, -50, 0, 20);
    const gradientSegment = ctx.createLinearGradient(right, 0, 0, 0);

    gradientSegment.addColorStop(0.1, "#6A6AC6");

    if (details.finishRateAvg <= 80) {
      gradientSegment.addColorStop(0.5, "#ACEC8D");
    } else if (details.finishRateAvg <= 100) {
      gradientSegment.addColorStop(0.5, "#EDE67E");
    } else {
      gradientSegment.addColorStop(0.5, "#CA3E3E");
    }

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
        borderRadius: 50,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: 8,
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
      const angle = Math.PI * 2;
      ctx.arc(xCoor, yCoor, outerRadius - width / 2, 0, angle * 360, false);
      ctx.strokeStyle = "#AAA";
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
    <Doughnut data={data} options={options} plugins={[backgroundCircle]} />
  );
};

export default BudgetStatusChart;

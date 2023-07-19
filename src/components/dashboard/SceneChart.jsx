import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Title,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  Title,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const SceneChart = () => {
  const [sceneProgressArray, setSceneProgressArray] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [chartOptions, setChartOptions] = useState({});

  // Get productionId from URL
  const router = useRouter();
  const { productionId } = router.query;

  // Get scene progress data from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/production/${productionId}/scene-progress`
        );

        if (response.ok) {
          const data = await response.json();
          setSceneProgressArray(data.sceneProgressArray);
          // console.log(data.sceneProgressArray)
        } else {
          throw new Error("Error fetching scene progress data");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [productionId]);

  useEffect(() => {
    const labels = sceneProgressArray.map((scene, index) => `Scene ${index + 1}`);
    const completedData = sceneProgressArray.map((scene) => scene.completed);
    const remainingData = sceneProgressArray.map((scene) => scene.remaining);
    const expectedData = sceneProgressArray.map((scene) => scene.expected);


    const numScenes = sceneProgressArray.length;
    const maxBarThickness = 80;
    const minBarThickness = 35;
    const barThickness = Math.max(
      minBarThickness,
      maxBarThickness / numScenes
    );

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Done",
          data: completedData,
          backgroundColor: "#6A6AC6",
          borderRadius: 4,
          barThickness: barThickness,
        },
        {
          label: "To be shot",
          data: remainingData,
          backgroundColor: "#DADAF4",
          borderRadius: 4,
          barThickness: barThickness,
        }
      ],
    });

    setChartOptions({
      plugins: {
        legend: {
          position: "bottom",
          align: "end",
          display: true,
          labels: {
            boxWidth: 15,
            boxHeight: 15,
          },
        },
        title: {
          display: true,
        },
      },
      maintainAspectRatio: false,
      responsive: true,
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
        },
        y: {
          display: false,
          stacked: true,
          grid: {
            display: false,
          },
        },
      },
    });
  }, [sceneProgressArray]);

  return (
    <div className="bg-arc rounded p-8">
      <div className="m-auto h-[25vh] w-full rounded pb-4 md:col-span-2 lg:h-[40vh]">
        <p className="font-bold text-lg text-primary-base">Scenes Shot Chart</p>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );

};

export default SceneChart;
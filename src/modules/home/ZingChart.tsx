import { useEffect, useRef } from "react";
import ChartTypes from "../../types/chartTypes";
import Chart, {
    BubbleDataPoint,
    ChartTypeRegistry,
    Point,
} from "chart.js/auto";
import { IconPlay } from "../../components/icons";
import { useNavigate } from "react-router-dom";

const ZingChart = ({ data }: { data: ChartTypes }) => {
    const navigate = useNavigate();
    const chartRef = useRef(null);
    const labels = data.chart.times
        .map((item, index) => (index % 2 === 0 ? item.hour : null))
        .filter((item) => item !== null)
        .map((item) => `${item}:00`);

    const dataset1 = data.chart.items[`${data.items[0].encodeId}`]
        .map((item, index) => (index % 2 === 0 ? item.counter : null))
        .filter((item) => item !== null);
    const dataset2 = data.chart.items[`${data.items[1].encodeId}`]
        .map((item, index) => (index % 2 === 0 ? item.counter : null))
        .filter((item) => item !== null);
    const dataset3 = data.chart.items[`${data.items[2].encodeId}`]
        .map((item, index) => (index % 2 === 0 ? item.counter : null))
        .filter((item) => item !== null);
    useEffect(() => {
        let chartInstance:
            | Chart<
                  keyof ChartTypeRegistry,
                  (
                      | number
                      | [number, number]
                      | Point
                      | BubbleDataPoint
                      | null
                  )[],
                  unknown
              >
            | Chart<"line", (number | null)[], string | null>
            | null = null;

        if (chartRef && chartRef.current) {
            if (chartInstance) {
                (chartInstance as Chart | null)?.destroy();
            }

            chartInstance = new Chart(chartRef.current, {
                type: "line",
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: data.items[0].title,
                            backgroundColor: "rgb(255, 99, 132)",
                            borderColor: "rgb(255, 99, 132)",
                            data: dataset1,
                            pointBorderWidth: 5,
                            pointHoverBorderWidth: 10,
                        },
                        {
                            label: data.items[1].title,
                            backgroundColor: "rgb(75, 192, 192)",
                            borderColor: "rgb(75, 192, 192)",
                            data: dataset2,
                            pointBorderWidth: 5,
                            pointHoverBorderWidth: 10,
                        },
                        {
                            label: data.items[2].title,
                            backgroundColor: "rgb(153, 102, 255)",
                            borderColor: "rgb(153, 102, 255)",
                            data: dataset3,
                            pointBorderWidth: 5,
                            pointHoverBorderWidth: 10,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            display: false,
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [data.items, dataset1, dataset2, dataset3, labels]);
    const totalScore = data.chart.totalScore;
    const calculateScore = (score: number) => {
        const percentage = (score / totalScore) * 100;
        const roundedPercentage = Math.round(percentage);
        return `${roundedPercentage} %`;
    };
    if (!data) return null;

    return (
        <section className="px-4 py-5 mb-20 overflow-hidden rounded-lg shadow-sdprimary bg-graySoft">
            <div className="flex items-center mb-5 gap-x-3">
                <h3 className="text-3xl font-bold zing-chart-gradient">
                    #zingchart
                </h3>
                <button className="flex items-center justify-center p-2 rounded-full bg-primary">
                    <IconPlay className="text-grayf3"></IconPlay>
                </button>
            </div>
            <div className="flex items-center justify-center gap-x-5">
                <div className="flex flex-col items-start justify-center gap-y-10 w-[500px]">
                    {data.items.slice(0, 3).map((item, index) => (
                        <div
                            key={item.encodeId}
                            className="flex items-center w-full h-full gap-x-2 border-2 border-primary px-[15px] py-[10px] rounded-lg hover:bg-tertiary cursor-pointer"
                        >
                            <span className="zing-chart-top">{index + 1}</span>
                            <div className="flex items-center justify-center gap-x-3">
                                <img
                                    src={item.thumbnailM}
                                    alt=""
                                    className="object-cover w-[60px] h-[60px] rounded-lg"
                                />
                                <div>
                                    <h3 className="text-xl font-bold leading-relaxed line-clamp-1">
                                        {item.title}
                                    </h3>
                                    <div className="flex flex-wrap items-center justify-center">
                                        {item.artists.map((artist, index) => (
                                            <span
                                                key={index}
                                                className="text-sm text-gray-500 line-clamp-1 hover:underline"
                                                onClick={() =>
                                                    navigate(
                                                        "/nghe-si/" +
                                                            artist.link
                                                    )
                                                }
                                            >
                                                {artist.name}
                                                {index !==
                                                    item.artists.length - 1 &&
                                                    ","}
                                                &nbsp;
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <span className="flex-shrink-0 ml-auto text-2xl font-bold">
                                {calculateScore(item.score)}
                            </span>
                        </div>
                    ))}
                    <button className="px-[25px] py-[5px] rounded-full m-auto bg-primary text-white text-lg hover:bg-secondary">
                        Xem thêm
                    </button>
                </div>
                <div className="flex-1">
                    <canvas ref={chartRef} />
                </div>
            </div>
        </section>
    );
};

export default ZingChart;

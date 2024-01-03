import { Swiper, SwiperSlide } from "swiper/react";
import HomeWeekChartTypes, {
    HomeWeekChartTypesItems,
} from "../../types/homeWeekChartTypes";
import { useNavigate } from "react-router-dom";

const WeekChart = ({ data }: { data: HomeWeekChartTypes }) => {
    const navigate = useNavigate();
    const weekChartData = data.items;
    if (!data) return null;
    return (
        <section className="mb-20 overflow-hidden">
            <Swiper
                grabCursor={true}
                slidesPerView={3}
                spaceBetween={30}
                pagination={{ clickable: true }}
                direction="horizontal"
            >
                {weekChartData.length > 0 &&
                    weekChartData.map((item: HomeWeekChartTypesItems) => (
                        <SwiperSlide key={item.country}>
                            <WeekChartItem
                                item={item}
                                navigate={navigate}
                            ></WeekChartItem>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </section>
    );
};

type WeekChartItemProps = {
    item: HomeWeekChartTypesItems;
    navigate: (link: string) => void;
};

const WeekChartItem = ({ item, navigate }: WeekChartItemProps) => {
    return (
        <div
            className="w-full h-full transition-all cursor-pointer"
            onClick={() => navigate(item.link)}
        >
            <img
                src={item.cover}
                alt=""
                className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform hover:scale-110"
            />
        </div>
    );
};

export default WeekChart;

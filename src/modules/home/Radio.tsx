import { Swiper, SwiperSlide } from "swiper/react";
import HomeRadioTypes, { HomeRadioItemTypes } from "../../types/homeRadioTypes";
import { IconChevronRight, IconPlay, IconSlider } from "../../components/icons";
import { useNavigate } from "react-router-dom";

const Radio = ({ data }: { data: HomeRadioTypes }) => {
    const navigate = useNavigate();
    return (
        <section className="mb-20 overflow-hidden rounded-lg">
            <div className="flex items-center justify-between mb-5">
                <div className="flex flex-col items-start justify-center gap-y-2">
                    <h3 className="text-2xl font-bold leading-relaxed">
                        {data.title}
                    </h3>
                </div>
                <div
                    className="flex items-center justify-center cursor-pointer gap-x-2 hover:underline"
                    onClick={() => navigate(data.link)}
                >
                    <span>TẤT CẢ</span>
                    <IconChevronRight></IconChevronRight>
                </div>
            </div>
            <Swiper
                grabCursor={true}
                slidesPerView={7}
                spaceBetween={30}
                pagination={{ clickable: true }}
                direction="horizontal"
            >
                {data.items.length > 0 &&
                    data.items.map((item: HomeRadioItemTypes) => (
                        <SwiperSlide key={item.encodeId}>
                            <RadioItem item={item}></RadioItem>
                        </SwiperSlide>
                    ))}
                <IconSlider></IconSlider>
            </Swiper>
        </section>
    );
};

const RadioItem = ({ item }: { item: HomeRadioItemTypes }) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex flex-col items-center justify-center w-full h-full transition-all cursor-pointer"
            onClick={() => navigate(item.link)}
        >
            <div className="relative w-full h-full overflow-hidden border-4 rounded-full border-error">
                <img
                    src={item.program.thumbnail}
                    alt=""
                    className="object-cover w-full h-full transition-transform duration-500 ease-in-out transform rounded-full hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out bg-black bg-opacity-50 opacity-0 hover:opacity-100">
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full">
                        <IconPlay className="text-primary" />
                    </div>
                </div>
            </div>
            <div className="absolute right-[-10px] top-20">
                <img
                    src={item.host.thumbnail}
                    alt=""
                    className="object-cover rounded-full w-14 h-14"
                />
            </div>
            <h3 className="text-lg font-medium line-clamp-1">
                {item.host.name}
            </h3>
            <span className="mt-auto text-sm font-normal">
                {item.activeUsers}
            </span>
        </div>
    );
};

export default Radio;

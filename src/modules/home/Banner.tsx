import { SwiperSlide, Swiper } from "swiper/react";
import { useNavigate } from "react-router-dom";
import BannerTypes, { BannerItemTypes } from "../../types/bannerTypes";
import { IconSlider } from "../../components/icons";
const Banner = ({ data }: { data: BannerTypes }) => {
    const navigate = useNavigate();
    const bannerData = data.items;
    return (
        <section className="mb-20 overflow-hidden rounded-lg">
            <Swiper
                grabCursor={true}
                slidesPerView={3}
                spaceBetween={30}
                pagination={{ clickable: true }}
                direction="horizontal"
            >
                {bannerData.length > 0 &&
                    bannerData.map((item: BannerItemTypes) => (
                        <SwiperSlide key={item.encodeId}>
                            <BannerItem
                                item={item}
                                navigate={navigate}
                            ></BannerItem>
                        </SwiperSlide>
                    ))}
                <IconSlider></IconSlider>
            </Swiper>
        </section>
    );
};

type BannerItemProps = {
    item: BannerItemTypes;
    navigate: (link: string) => void;
};

const BannerItem = ({ item, navigate }: BannerItemProps) => {
    return (
        <div
            className="w-full h-full transition-all cursor-pointer"
            onClick={() => navigate(item.link)}
        >
            <img
                src={item.banner}
                alt=""
                className="object-cover w-full h-full rounded-lg"
            />
        </div>
    );
};

export default Banner;

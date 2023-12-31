import { useNavigate } from "react-router-dom";
import HomePlaylistTypes, {
    HomePlaylistItemTypes,
} from "../../types/homePlaylistTypes";
import { IconChevronRight, IconSlider } from "../../components/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

const Playlist = ({ data }: { data: HomePlaylistTypes[] }) => {
    if (data.length === 0) return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    return (
        <>
            {data.map((item: HomePlaylistTypes) => (
                <section
                    className="mb-20 overflow-hidden rounded-lg"
                    key={uuidv4()}
                >
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex flex-col items-start justify-center gap-y-2">
                            <h2 className="mb-5 text-2xl font-bold">
                                {item.title}
                            </h2>
                        </div>
                        <div
                            className="flex items-center justify-center cursor-pointer gap-x-2 hover:underline"
                            onClick={() => navigate(item.link)}
                        >
                            <span>TẤT CẢ</span>
                            <IconChevronRight></IconChevronRight>
                        </div>
                    </div>
                    <Swiper
                        grabCursor={true}
                        slidesPerView={4}
                        spaceBetween={30}
                        pagination={{ clickable: true }}
                        direction="horizontal"
                    >
                        {item.items.length > 0 &&
                            item.items.map((item: HomePlaylistItemTypes) => (
                                <SwiperSlide key={item.encodeId}>
                                    <PlaylistItem
                                        item={item}
                                        key={uuidv4()}
                                    ></PlaylistItem>
                                </SwiperSlide>
                            ))}
                        <IconSlider></IconSlider>
                    </Swiper>
                </section>
            ))}
        </>
    );
};

const PlaylistItem = ({ item }: { item: HomePlaylistItemTypes }) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex flex-col items-start justify-center w-full h-full transition-all cursor-pointer"
            onClick={() => navigate(item.link)}
        >
            <img
                src={item.thumbnailM}
                alt=""
                className="object-cover w-full h-full rounded-lg"
            />
            <h3 className="text-lg font-medium line-clamp-1">{item.title}</h3>
            <span className="mt-auto text-sm font-normal">
                {item.artistsNames}
            </span>
        </div>
    );
};

export default Playlist;

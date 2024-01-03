import { useState } from "react";
import NewReleaseTypes, {
    NewReleaseSongTypes,
} from "../../types/newReleaseTypes";
import formatDateTime from "../../utils/formatDateTime";
import { IconChevronRight, IconPlay } from "../../components/icons";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
    setPlayerData,
    setShowBottomPlayer,
} from "../../store/actions/musicSlice";
import { useDispatch } from "react-redux";

const NewRelease = ({ data }: { data: NewReleaseTypes }) => {
    const [type, setType] = useState("all");
    const navigate = useNavigate();
    if (!data) return null;
    return (
        <div className="mb-20">
            <div className="flex items-center justify-between mb-5 dark:text-lite">
                <div className="flex flex-col items-start justify-center gap-y-2">
                    <h3 className="text-2xl font-bold leading-relaxed">
                        {data.title}
                    </h3>
                    <div className="flex items-center justify-center gap-x-5">
                        <span
                            onClick={() => setType("all")}
                            className={`px-6 py-1 border rounded-full cursor-pointer dark:border-thirdly border-darkSoft ${
                                type === "all"
                                    ? "bg-primary dark:bg-thirdly text-white"
                                    : "hover:text-text4"
                            }`}
                        >
                            TẤT CẢ
                        </span>
                        <span
                            className={`px-6 py-1 border rounded-full cursor-pointer dark:border-thirdly border-darkSoft ${
                                type === "vPop"
                                    ? "bg-primary dark:bg-thirdly text-white"
                                    : "hover:text-text4"
                            }`}
                            onClick={() => setType("vPop")}
                        >
                            VIỆT NAM
                        </span>
                        <span
                            onClick={() => setType("others")}
                            className={`px-6 py-1 border rounded-full cursor-pointer dark:border-thirdly border-darkSoft ${
                                type === "others"
                                    ? "bg-primary dark:bg-thirdly text-white"
                                    : "hover:text-text4"
                            }`}
                        >
                            QUỐC TẾ
                        </span>
                    </div>
                </div>
                <div
                    className="flex items-center justify-center cursor-pointer gap-x-2 hover:underline"
                    onClick={() => navigate(data.link)}
                >
                    <span>TẤT CẢ</span>
                    <IconChevronRight></IconChevronRight>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 dark:text-lite">
                {type === "all" &&
                    data.items.all
                        .slice(0, 8)
                        .map((item) => (
                            <NewReleaseItem
                                key={uuidv4()}
                                item={item}
                                navigate={navigate}
                            ></NewReleaseItem>
                        ))}
                {type === "vPop" &&
                    data.items.vPop
                        .slice(0, 8)
                        .map((item) => (
                            <NewReleaseItem
                                key={uuidv4()}
                                item={item}
                                navigate={navigate}
                            ></NewReleaseItem>
                        ))}
                {type === "others" &&
                    data.items.others
                        .slice(0, 8)
                        .map((item) => (
                            <NewReleaseItem
                                key={uuidv4()}
                                item={item}
                                navigate={navigate}
                            ></NewReleaseItem>
                        ))}
            </div>
        </div>
    );
};

type NewReleaseItemProps = {
    item: NewReleaseSongTypes;
    navigate: (link: string) => void;
};

const NewReleaseItem = ({ item, navigate }: NewReleaseItemProps) => {
    const dispatch = useDispatch();
    const handlePlay = () => {
        dispatch(setPlayerData(item));
        dispatch(setShowBottomPlayer(true));
    };
    return (
        <div className="px-4 py-2 mb-5 rounded-lg hover:bg-tertiary dark:hover:text-text2">
            <div className="flex items-center gap-x-5">
                <div
                    className="relative flex items-center justify-center w-16 h-16 cursor-pointer"
                    onClick={handlePlay}
                >
                    <img
                        src={item.thumbnailM}
                        alt={item.title}
                        className="w-full h-full rounded-lg"
                    />
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out bg-black opacity-0 bg-opacity-40 text-lite hover:opacity-100">
                        <IconPlay />
                    </div>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <h4 className="text-xl font-bold leading-relaxed line-clamp-1">
                        {item.title}
                    </h4>
                    <div className="flex flex-wrap items-center justify-center cursor-pointer">
                        {item.artists.map((artist, index) => (
                            <span
                                key={index}
                                className="text-sm text-gray-500 line-clamp-1 hover:underline"
                                onClick={() =>
                                    navigate("/nghe-si/" + artist.link)
                                }
                            >
                                {artist.name}
                                {index !== item.artists.length - 1 && ","}
                                &nbsp;
                            </span>
                        ))}
                    </div>
                    <span className="text-sm font-medium leading-relaxed text-text3">
                        {formatDateTime(item.releaseDate)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NewRelease;

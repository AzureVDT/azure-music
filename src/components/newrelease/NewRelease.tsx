import { useState } from "react";
import NewReleaseTypes, {
    NewReleaseSongTypes,
} from "../../types/newReleaseTypes";
import formatDateTime from "../../utils/formatDateTime";
import { IconChevronRight } from "../icons";
import { useNavigate } from "react-router-dom";

const NewRelease = ({ data }: { data: NewReleaseTypes }) => {
    const [type, setType] = useState("all");
    const navigate = useNavigate();
    if (!data) return null;
    return (
        <div className="mb-20">
            <div className="flex items-center justify-between mb-5">
                <div className="flex flex-col items-start justify-center gap-y-2">
                    <h3 className="text-2xl font-bold leading-relaxed">
                        {data.title}
                    </h3>
                    <div className="flex items-center justify-center gap-x-5">
                        <span
                            onClick={() => setType("all")}
                            className={`px-6 py-1 border rounded-full cursor-pointer border-darkSoft ${
                                type === "all"
                                    ? "bg-primary text-white"
                                    : "hover:text-text4"
                            }`}
                        >
                            TẤT CẢ
                        </span>
                        <span
                            className={`px-6 py-1 border rounded-full cursor-pointer border-darkSoft ${
                                type === "vPop"
                                    ? "bg-primary text-white"
                                    : "hover:text-text4"
                            }`}
                            onClick={() => setType("vPop")}
                        >
                            VIỆT NAM
                        </span>
                        <span
                            onClick={() => setType("others")}
                            className={`px-6 py-1 border rounded-full cursor-pointer border-darkSoft ${
                                type === "others"
                                    ? "bg-primary text-white"
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
            <div className="grid grid-cols-2 gap-5">
                {type === "all" &&
                    data.items.all
                        .slice(0, 8)
                        .map((item) => (
                            <NewReleaseItem item={item}></NewReleaseItem>
                        ))}
                {type === "vPop" &&
                    data.items.vPop
                        .slice(0, 8)
                        .map((item) => (
                            <NewReleaseItem item={item}></NewReleaseItem>
                        ))}
                {type === "others" &&
                    data.items.others
                        .slice(0, 8)
                        .map((item) => (
                            <NewReleaseItem item={item}></NewReleaseItem>
                        ))}
            </div>
        </div>
    );
};

const NewReleaseItem = ({ item }: { item: NewReleaseSongTypes }) => {
    return (
        <div key={item.encodeId} className="mb-5 hover:bg-[#ccc] px-4 py-2">
            <div className="flex items-center gap-x-5">
                <div className="flex items-center justify-center w-16 h-16">
                    <img
                        src={item.thumbnailM}
                        alt={item.title}
                        className="w-full h-full rounded-full"
                    />
                </div>
                <div className="flex flex-col items-start justify-center">
                    <h4 className="text-xl font-bold leading-relaxed">
                        {item.title}
                    </h4>
                    <span className="text-sm font-medium leading-relaxed text-text3">
                        {item.artistsNames}
                    </span>
                    <span className="text-sm font-medium leading-relaxed text-text3">
                        {formatDateTime(item.releaseDate)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NewRelease;

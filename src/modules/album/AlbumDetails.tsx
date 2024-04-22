import { IconLove, IconMore, IconPlay } from "../../components/icons";
import AlbumTypes from "../../types/albumTypes";
import formatDate from "../../utils/formatDate";

const AlbumDetails = ({
    albumData,
    navigate,
}: {
    albumData: AlbumTypes;
    navigate: (link: string) => void;
}) => {
    if (!albumData) return null;
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-[300px] h-[300px] rounded-lg mb-5">
                <img
                    src={
                        albumData.thumbnailM ||
                        albumData.thumbnail ||
                        `https://source.unsplash.com/random`
                    }
                    alt={albumData.title}
                    className="object-cover w-full h-full rounded-lg"
                />
            </div>
            <h3 className="text-xl font-bold">{albumData.title}</h3>
            <div className="flex flex-col items-center justify-center mt-5 mb-5 text-xs font-normal gap-y-1 text-text2">
                <span>
                    Cập nhật:{" "}
                    {albumData?.contentLastUpdate &&
                        formatDate(albumData?.contentLastUpdate)}
                </span>
                <div className="flex flex-wrap items-center justify-start cursor-pointer">
                    {albumData?.artists?.map((artist, index) => (
                        <span
                            key={index}
                            className="text-sm text-text2 dark:text-grayf3 line-clamp-1 hover:underline"
                            onClick={() => navigate("/nghe-si/" + artist.link)}
                        >
                            {artist.name}
                            {index !== albumData.artists.length - 1 && ","}
                            &nbsp;
                        </span>
                    ))}
                </div>
                <span>
                    {Math.round(albumData.like / 1000) > 0
                        ? `${Math.round(albumData.like / 1000)}K`
                        : albumData.like}{" "}
                    người yêu thích
                </span>
            </div>
            <button className="flex items-center justify-center w-[174px] h-[36px] bg-primary hover:bg-secondary rounded-full text-lite">
                <IconPlay className="w-6 h-6"></IconPlay>
                <span>TIẾP TỤC PHÁT</span>
            </button>
            <div className="flex items-center justify-center mt-5 gap-x-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer text-text2 bg-tertiary hover:bg-thirdly hover:text-lite">
                    <IconLove className="w-6 h-6"></IconLove>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer bg-tertiary hover:bg-thirdly hover:text-lite">
                    <IconMore className="w-6 h-6"></IconMore>
                </div>
            </div>
        </div>
    );
};

export default AlbumDetails;

import { useDispatch } from "react-redux";
import { NewReleaseSongTypes } from "../../types/newReleaseTypes";
import React, { useMemo, useState } from "react";
import { formatDuration } from "../../utils/formatDuration";
import {
    setAlbumData,
    setIsPremium,
    setPlayerData,
    setPlaylistQueue,
    setShowBottomPlayer,
    setShowPlaylist,
    setShowRecentlyPlayed,
} from "../../store/actions/musicSlice";
import {
    IconLove,
    IconMicro,
    IconMore,
    IconPlay,
    IconPremium,
} from "../../components/icons";
import AlbumTypes from "../../types/albumTypes";
import { RootState } from "../../store/configureStore";
import { useSelector } from "react-redux";
type AlbumItemProps = {
    item: NewReleaseSongTypes;
    navigate: (link: string) => void;
};

const AlbumItem = React.memo(({ item, navigate }: AlbumItemProps) => {
    const dispatch = useDispatch();
    const [isHover, setIsHover] = useState(false);

    const formattedDuration = useMemo(
        () => formatDuration(item.duration),
        [item.duration]
    );
    const albumData = useSelector((state: RootState) => state.music.albumData);
    const handlePlay = () => {
        dispatch(setPlayerData(item));
        dispatch(setShowBottomPlayer(true));
        dispatch(setShowPlaylist(true));
        dispatch(setShowRecentlyPlayed(false));
        item.streamingStatus === 2
            ? dispatch(setIsPremium(true))
            : dispatch(setIsPremium(false));
        dispatch(setPlaylistQueue(albumData.song.items));
    };

    const link = item.album?.link.split(".html")[0];

    return (
        <div
            className="grid grid-cols-2 w-full h-[56px] items-center rounded-lg px-2 bg-lite select-none hover:bg-tertiary hover:bg-opacity-40"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {/* Bài hát */}
            <div className="flex items-center gap-x-2">
                <div
                    className="relative flex-shrink-0 w-10 h-10 rounded-md cursor-pointer bg-text2"
                    onClick={handlePlay}
                >
                    <img
                        src={item.thumbnailM}
                        alt={item.title}
                        className="w-full h-full rounded-md"
                    />
                    <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out bg-black rounded-md opacity-0 bg-opacity-40 text-lite hover:opacity-100">
                        <IconPlay />
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-x-3">
                        <h4 className="text-sm font-medium line-clamp-1">
                            {item.title}
                        </h4>
                        {item.streamingStatus === 2 ? <IconPremium /> : null}
                    </div>
                    <div className="flex flex-wrap items-center cursor-pointer">
                        {item?.artists?.map((artist, index) => (
                            <span
                                key={index}
                                className="text-xs font-normal text-text2 dark:text-grayf3 line-clamp-1 hover:underline"
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
                </div>
            </div>
            <div className="flex items-center justify-between">
                {/* Album */}
                <div
                    className="text-xs font-normal cursor-pointer hover:underline hover:text-primary"
                    onClick={() => {
                        dispatch(setAlbumData({} as AlbumTypes));
                        navigate(link ?? "");
                    }}
                >
                    {item.album?.title}
                </div>
                {/* Thời gian */}
                {isHover ? (
                    <div className="flex items-center justify-center gap-x-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-darkSoft hover:bg-opacity-10">
                            <IconMicro className="w-6 h-6"></IconMicro>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-darkSoft hover:bg-opacity-10">
                            <IconLove className="w-6 h-6"></IconLove>
                        </div>
                        <div className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-darkSoft hover:bg-opacity-10">
                            <IconMore className="w-6 h-6"></IconMore>
                        </div>
                    </div>
                ) : (
                    <div>{formattedDuration}</div>
                )}
            </div>
        </div>
    );
});

export default AlbumItem;

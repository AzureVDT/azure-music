import { useDispatch } from "react-redux";
import {
    setPlayerData,
    setPlaylistQueue,
    setShowPlaylist,
    setShowRecentlyPlayed,
} from "../../store/actions/musicSlice";
import saveSongIntoRecentPlaylist from "../../utils/saveSongIntoRecentPlaylist";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { IconPlay, IconPremium } from "../../components/icons";
import { NewReleaseSongTypes } from "../../types/newReleaseTypes";
import { setCurrentProgress } from "../../store/actions/playerSlice";

const DashboardQueueItem = ({
    item,
    navigate,
    id,
    isDragging,
    isRecentPlaylist,
    isLast,
    playlistQueue,
}: QueueItemProps) => {
    const dispatch = useDispatch();
    const isActive = item.encodeId === id && !isRecentPlaylist;
    const handlePlaySong = () => {
        dispatch(setPlayerData(item));
        dispatch(setCurrentProgress(0));
        saveSongIntoRecentPlaylist(item);
        if (isRecentPlaylist) {
            const isExist = playlistQueue?.find(
                (song) => song.encodeId === item.encodeId
            );
            if (!isExist) {
                // add item under the item has isActive = true
                const index = playlistQueue?.findIndex(
                    (song) => song.encodeId === id
                );
                const newPlaylistQueue = [...(playlistQueue ?? [])];
                newPlaylistQueue.splice((index as number) + 1, 0, item);
                dispatch(setPlaylistQueue(newPlaylistQueue));
            }
            dispatch(setShowRecentlyPlayed(false));
            dispatch(setShowPlaylist(true));
        }
    };
    const albumData = useSelector((state: RootState) => state.music.albumData);
    return (
        <>
            <div
                className={`w-full h-[56px] flex items-center justify-start gap-x-5 rounded-lg text-text1 dark:text-lite px-2 dark:bg-darkSoft select-none ${
                    isActive
                        ? "bg-opacity-80 bg-secondary"
                        : "hover:bg-opacity-80 hover:bg-tertiary"
                }`}
            >
                <div
                    className="relative flex-shrink-0 w-10 h-10 rounded-md cursor-pointer bg-text2"
                    onClick={handlePlaySong}
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
                <div className="flex flex-col items-start justify-center w-full h-full">
                    <div className="flex items-center justify-center gap-x-3">
                        <h3 className="text-sm font-medium line-clamp-1">
                            {item.title}
                        </h3>
                        {item.streamingStatus === 2 ? <IconPremium /> : null}
                    </div>
                    <div className="flex items-center justify-start gap-x-2">
                        <div
                            className={`flex items-center text-gray-500 line-clamp-1 ${
                                isActive ? "text-lite" : ""
                            }`}
                        >
                            {item?.artists?.map((artist, index) => (
                                <span
                                    key={index}
                                    className="flex-shrink-0 text-xs cursor-pointer hover:underline hover:text-lite"
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
            </div>
            {!isDragging && !isLast && isActive && (
                <div className="flex flex-col items-start justify-center px-2 my-3 gap-y-2">
                    <h3 className="font-bold text-md dark:text-lite text-text1">
                        Tiếp theo
                    </h3>
                    <p className="text-sm font-medium gap-x-3 text-text3">
                        <span>
                            Từ {item.album ? "playlist" : "danh sách bài hát"}{" "}
                        </span>
                        <strong className="cursor-pointer text-secondary">
                            {item.album ? albumData.title : "Mới phát hành"}
                        </strong>
                    </p>
                </div>
            )}
        </>
    );
};

type QueueItemProps = {
    item: NewReleaseSongTypes;
    navigate: (link: string) => void;
    id: string;
    isDragging?: boolean;
    isRecentPlaylist?: boolean;
    isLast?: boolean;
    playlistQueue?: NewReleaseSongTypes[];
};

export default DashboardQueueItem;

import { useDispatch, useSelector } from "react-redux";
import { IconMore, IconPlay, IconPremium } from "../../components/icons";
import { RootState } from "../../store/configureStore";
import {
    setPlayerData,
    setPlaylistQueue,
    setShowPlaylist,
    setShowRecentlyPlayed,
} from "../../store/actions/musicSlice";
import { AnimatePresence, motion } from "framer-motion";
import { NewReleaseSongTypes } from "../../types/newReleaseTypes";
import { useNavigate } from "react-router-dom";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import saveSongIntoRecentPlaylist from "../../utils/saveSongIntoRecentPlaylist";

const DashboardQueue = () => {
    const dispatch = useDispatch();
    const showQueue = useSelector((state: RootState) => state.music.showQueue);
    const showPlaylist = useSelector(
        (state: RootState) => state.music.showPlaylist
    );
    const showRecentlyPlayed = useSelector(
        (state: RootState) => state.music.showRecentlyPlayed
    );
    const activeClass = "bg-lite py-[5px] text-text2 rounded-full";
    const playlistQueue = useSelector(
        (state: RootState) => state.music.playlistQueue
    );
    const navigate = useNavigate();
    const playerData = useSelector(
        (state: RootState) => state.music.playerData
    );
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(playlistQueue);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        // Dispatch an action to update the playlistQueue state with the new order of items
        dispatch(setPlaylistQueue(items));
    };
    const recentQueue = JSON.parse(
        localStorage.getItem("azure-music-recently-played") || "[]"
    );
    return (
        <AnimatePresence>
            {showQueue && (
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ type: "spring", stiffness: 60, damping: 20 }}
                    className="w-[330px] h-full fixed top-0 right-0 bg-darkSoft overflow-y-scroll z-50 p-3 text-lite
        flex flex-col items-start justify-start zing-scroll__bar"
                >
                    <div className="py-[14px] flex items-center justify-start w-full">
                        <div className="p-[3px] flex items-center justify-center w-full bg-text2 h-[34px] rounded-full">
                            <button
                                className={`w-full h-full text-xs font-medium ${
                                    showPlaylist ? activeClass : ""
                                }`}
                                onClick={() => {
                                    dispatch(setShowPlaylist(true));
                                    dispatch(setShowRecentlyPlayed(false));
                                }}
                            >
                                Danh sách phát
                            </button>
                            <button
                                className={`w-full h-full text-xs font-medium ${
                                    showRecentlyPlayed ? activeClass : ""
                                }`}
                                onClick={() => {
                                    dispatch(setShowRecentlyPlayed(true));
                                    dispatch(setShowPlaylist(false));
                                }}
                            >
                                Nghe gần đây
                            </button>
                        </div>
                        <button className="w-[32px] h-[32px] flex items-center justify-center bg-text3 rounded-full ml-[30px] flex-shrink-0">
                            <IconMore className="w-[16px] h-[16px] text-lite"></IconMore>
                        </button>
                    </div>
                    <div className="pb-[90px]">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {showPlaylist &&
                                            playlistQueue.map((item, index) => (
                                                <Draggable
                                                    key={item.encodeId}
                                                    draggableId={item.encodeId}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) =>
                                                        index !==
                                                        playlistQueue.length -
                                                            1 ? (
                                                            <div
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <DashboardQueueItem
                                                                    item={item}
                                                                    navigate={
                                                                        navigate
                                                                    }
                                                                    id={
                                                                        playerData.encodeId
                                                                    }
                                                                    isDragging={
                                                                        snapshot.isDragging
                                                                    }
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                            >
                                                                <DashboardQueueItem
                                                                    item={item}
                                                                    navigate={
                                                                        navigate
                                                                    }
                                                                    id={
                                                                        playerData.encodeId
                                                                    }
                                                                    isDragging={
                                                                        snapshot.isDragging
                                                                    }
                                                                    isLast={
                                                                        true
                                                                    }
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            ))}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        {showRecentlyPlayed &&
                            recentQueue.map((item: NewReleaseSongTypes) => (
                                <DashboardQueueItem
                                    item={item}
                                    key={uuidv4()}
                                    navigate={navigate}
                                    id={playerData.encodeId}
                                    isRecentPlaylist={true}
                                ></DashboardQueueItem>
                            ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

type QueueItemProps = {
    item: NewReleaseSongTypes;
    navigate: (link: string) => void;
    id: string;
    isDragging?: boolean;
    isRecentPlaylist?: boolean;
    isLast?: boolean;
};

const DashboardQueueItem = ({
    item,
    navigate,
    id,
    isDragging,
    isRecentPlaylist,
    isLast,
}: QueueItemProps) => {
    const dispatch = useDispatch();
    const isActive = item.encodeId === id && !isRecentPlaylist;
    const handlePlaySong = () => {
        dispatch(setPlayerData(item));
        saveSongIntoRecentPlaylist(item);
        if (isRecentPlaylist) {
            dispatch(setShowRecentlyPlayed(false));
            dispatch(setShowPlaylist(true));
        }
    };
    const albumData = useSelector((state: RootState) => state.music.albumData);
    return (
        <>
            <div
                className={`w-full h-[56px] flex items-center justify-start gap-x-5 rounded-lg px-2 bg-darkSoft select-none ${
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
                    <h3 className="font-bold text-md text-lite">Tiếp theo</h3>
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

export default DashboardQueue;

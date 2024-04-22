import { useDispatch, useSelector } from "react-redux";
import {
    IconAdd,
    IconDelete,
    IconDownload,
    IconMore,
} from "../../components/icons";
import { RootState } from "../../store/configureStore";
import {
    setPlaylistQueue,
    setShowBottomPlayer,
    setShowPlaylist,
    setShowQueue,
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
import { useState } from "react";
import DashboardQueueItem from "./DashboardQueueItem";

const DashboardQueue = () => {
    const dispatch = useDispatch();
    const [showOptions, setShowOptions] = useState(false);
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
    const handleDeleteQueue = () => {
        dispatch(setPlaylistQueue([]));
        dispatch(setShowPlaylist(false));
        dispatch(setShowRecentlyPlayed(false));
        dispatch(setShowBottomPlayer(false));
        dispatch(setShowQueue(false));
        setShowOptions(false);
    };

    return (
        <AnimatePresence>
            {showQueue && (
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ type: "spring", stiffness: 60, damping: 20 }}
                    className="w-[330px] h-full fixed top-0 right-0 bg-strock dark:bg-darkSoft overflow-y-scroll z-50 p-3 text-lite
        flex flex-col items-start justify-start zing-scroll__bar"
                >
                    <div className="py-[14px] flex items-center justify-start w-full">
                        <div className="p-[3px] flex items-center justify-center w-full bg-secondary dark:bg-text2 h-[34px] rounded-full">
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
                        <button
                            onClick={() => setShowOptions(!showOptions)}
                            className="w-[32px] h-[32px] flex items-center justify-center bg-text3 rounded-full ml-[30px] flex-shrink-0"
                        >
                            <IconMore className="w-[16px] h-[16px] text-lite"></IconMore>
                        </button>
                        {showOptions && (
                            <div className="rounded-lg fixed shadow-sm bg-darkSecondary top-16 z-50 right-5 w-[240px] h-[130px] py-[10px] flex flex-col justify-center">
                                <button
                                    onClick={handleDeleteQueue}
                                    className="flex items-center justify-start flex-shrink-0 gap-x-3 py-[10px] px-[15px] hover:bg-secondary hover:bg-opacity-40"
                                >
                                    <IconDelete className="w-4 h-4"></IconDelete>
                                    <span className="text-sm font-normal">
                                        Xóa danh sách phát
                                    </span>
                                </button>
                                <button className="flex items-center justify-start flex-shrink-0 gap-x-3 py-[10px] px-[15px] hover:bg-secondary hover:bg-opacity-40">
                                    <IconDownload className="w-4 h-4"></IconDownload>
                                    <span className="text-sm font-normal">
                                        Tải danh sách phát
                                    </span>
                                </button>
                                <button className="flex items-center justify-start flex-shrink-0 gap-x-3 py-[10px] px-[15px] hover:bg-secondary hover:bg-opacity-40">
                                    <IconAdd className="w-4 h-4"></IconAdd>
                                    <span className="text-sm font-normal">
                                        Thêm vào playlist
                                    </span>
                                </button>
                            </div>
                        )}
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
                                    playlistQueue={playlistQueue}
                                ></DashboardQueueItem>
                            ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DashboardQueue;

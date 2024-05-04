import { useDispatch, useSelector } from "react-redux";
import {
    IconList,
    IconLove,
    IconMicro,
    IconMore,
    IconNext,
    IconPause,
    IconPlay,
    IconPrev,
    IconRandom,
    IconRepeat,
    IconVolumn,
} from "../../components/icons";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { RootState } from "../../store/configureStore";
import {
    setCurrentProgress,
    setCurrentSongIndex,
    setIsMute,
    setIsPlaying,
    setIsRandom,
    setIsRepeat,
    setVolume,
} from "../../store/actions/playerSlice";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../../utils/formatDuration";
import { toast } from "react-toastify";
import { setPlayerData, setShowQueue } from "../../store/actions/musicSlice";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import saveSongIntoRecentPlaylist from "../../utils/saveSongIntoRecentPlaylist";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import useStreamingUrl from "../../hooks/useStreamingUrl";
import ReactPlayer from "react-player/lazy";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
const DashboardBottomBar = () => {
    const progressArea = useRef<HTMLDivElement>(null);
    const progressBar = useRef<HTMLDivElement>(null);
    const playerRef = useRef<ReactPlayer>(null);
    const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
    const dispatch = useDispatch();
    const playerData = useSelector(
        (state: RootState) => state.music.playerData
    );
    const volume = useSelector((state: RootState) => state.player.volume);
    const currentProgress = useSelector(
        (state: RootState) => state.player.currentProgress
    );
    const { audioUrl, loading, setAudioUrl } = useStreamingUrl(playerData);
    const isRepeat = useSelector((state: RootState) => state.player.isRepeat);
    const showQueue = useSelector((state: RootState) => state.music.showQueue);
    const playlistQueue = useSelector(
        (state: RootState) => state.music.playlistQueue
    );
    const currentSongIndex = useSelector(
        (state: RootState) => state.player.currentSongIndex
    );
    const isMute = useSelector((state: RootState) => state.player.isMute);
    const isRandom = useSelector((state: RootState) => state.player.isRandom);
    const navigate = useNavigate();
    useLayoutEffect(() => {
        if (progressBar.current && progressBar.current.style) {
            progressBar.current.style.width =
                (currentProgress / playerData?.duration) * 100 + "%";
        }
    }, [currentProgress, playerData?.duration]);
    const handlePlay = async () => {
        const isPremium = playerData.streamingStatus === 2 ? true : false;
        if (!isPremium) {
            dispatch(setCurrentProgress(0));
            dispatch(setIsPlaying(!isPlaying));
        } else {
            toast.info("Chức năng này chỉ dành cho người dùng VIP", {
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
            });
        }
    };

    const handleNext = useCallback(() => {
        let nextSongIndex = currentSongIndex + 1;
        while (playlistQueue[nextSongIndex]?.streamingStatus === 2) {
            nextSongIndex++;
        }

        dispatch(setIsPlaying(false));
        setAudioUrl("");
        dispatch(setCurrentProgress(0));
        dispatch(setCurrentSongIndex(nextSongIndex));
        dispatch(setPlayerData(playlistQueue[nextSongIndex]));
        dispatch(setIsPlaying(true));
    }, [currentSongIndex, dispatch, playlistQueue, setAudioUrl]);

    const handlePrev = useCallback(() => {
        let prevSongIndex = currentSongIndex - 1;
        while (
            prevSongIndex >= 0 &&
            playlistQueue[prevSongIndex]?.streamingStatus === 2
        ) {
            prevSongIndex--;
        }

        if (prevSongIndex >= 0) {
            dispatch(setIsPlaying(false));
            setAudioUrl("");
            dispatch(setCurrentProgress(0));
            dispatch(setCurrentSongIndex(prevSongIndex));
            dispatch(setPlayerData(playlistQueue[prevSongIndex]));
            dispatch(setIsPlaying(true));
        }
    }, [currentSongIndex, dispatch, playlistQueue, setAudioUrl]);
    const handleRepeat = useCallback(() => {
        if (playerRef.current) {
            dispatch(setCurrentProgress(0));
            playerRef.current.seekTo(0);
        }
    }, [dispatch]);

    const handleRandomSong = useCallback(() => {
        dispatch(setIsPlaying(false));
        const randomIndex = Math.floor(Math.random() * playlistQueue.length);
        dispatch(setCurrentSongIndex(randomIndex));
        dispatch(setPlayerData(playlistQueue[randomIndex]));
        dispatch(setCurrentProgress(0));
        dispatch(setIsPlaying(true));
    }, [dispatch, playlistQueue]);

    const handleProgressPress = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (progressArea.current && playerRef.current) {
                const { width } = progressArea.current.getBoundingClientRect();
                const clickX = event.nativeEvent.offsetX;
                const duration = playerData?.duration;
                const newProgress = (clickX / width) * duration;
                if (progressBar.current && progressBar.current.style) {
                    progressBar.current.style.width =
                        (newProgress / duration) * 100 + "%";
                }
                dispatch(setCurrentProgress(newProgress));
                playerRef.current.seekTo(newProgress);
            }
        },
        [dispatch, playerData?.duration]
    );

    useEffect(() => {
        if (playerData) {
            saveSongIntoRecentPlaylist(playerData); // set playerData into localStorage in azure-music-recently-played Array
        }
    }, [playerData]);
    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 h-[90px] shadow-md bg-tertiary z-50">
                <div className="flex items-center justify-between px-5">
                    <div className="flex items-center justify-center mt-3 gap-x-3">
                        <div>
                            <img
                                src={playerData.thumbnailM}
                                alt={playerData.title}
                                className="object-cover w-16 h-16 rounded-md"
                            />
                        </div>
                        <div className="flex items-center justify-center gap-x-5">
                            <div>
                                <h3 className="text-lg font-medium line-clamp-1">
                                    {playerData.title}
                                </h3>
                                <div className="flex flex-wrap items-center justify-start cursor-pointer">
                                    {playerData.artists.map((artist, index) => (
                                        <span
                                            key={index}
                                            className="text-sm text-gray-500 line-clamp-1 hover:underline dark:hover:text-lite"
                                            onClick={() =>
                                                navigate(
                                                    "/nghe-si/" + artist.link
                                                )
                                            }
                                        >
                                            {artist.name}
                                            {index !==
                                                playerData.artists.length - 1 &&
                                                ","}
                                            &nbsp;
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-x-2">
                                <IconLove className="w-6 h-6 cursor-pointer text-text4"></IconLove>
                                <IconMore className="w-6 h-6 cursor-pointer text-text4"></IconMore>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-2 gap-y-2">
                        <div className="flex items-center justify-center gap-x-5">
                            <button
                                onClick={() => dispatch(setIsRandom(!isRandom))}
                                className={`${
                                    isRandom ? "text-secondary" : "text-text1"
                                } flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary dark:hover:bg-thirdly hover:text-grayf3`}
                            >
                                <IconRandom></IconRandom>
                            </button>
                            <button
                                onClick={handlePrev}
                                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary dark:hover:bg-thirdly hover:text-grayf3"
                                disabled={currentSongIndex === 0}
                            >
                                <IconPrev></IconPrev>
                            </button>
                            <button
                                className={`flex items-center justify-center w-10 h-10 border-2 rounded-full 
                                dark:text-darkBG border-secondary bg-lite hover:bg-tertiary 
                                dark:hover:bg-thirdly hover:text-grayf3`}
                                disabled={loading}
                                onClick={handlePlay}
                            >
                                {!loading &&
                                    (isPlaying ? <IconPause /> : <IconPlay />)}
                                {loading && <LoadingSpinner />}
                            </button>
                            <button
                                onClick={handleNext}
                                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary dark:hover:bg-thirdly hover:text-grayf3"
                            >
                                <IconNext></IconNext>
                            </button>
                            <button
                                onClick={() => dispatch(setIsRepeat(!isRepeat))}
                                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary dark:hover:bg-thirdly hover:text-grayf3"
                            >
                                {isRepeat ? (
                                    <RepeatOneIcon></RepeatOneIcon>
                                ) : (
                                    <IconRepeat></IconRepeat>
                                )}
                            </button>
                        </div>
                        <div className="flex items-center justify-center gap-x-2">
                            <span className="text-sm font-medium">
                                {formatDuration(currentProgress)}
                            </span>
                            <div
                                ref={progressArea}
                                onClick={handleProgressPress}
                                className="w-[370px] h-[4px] rounded-full bg-text4 cursor-pointer"
                            >
                                <div
                                    ref={progressBar}
                                    className="h-[4px] bg-primary rounded-full"
                                ></div>
                            </div>
                            <span className="text-sm font-medium">
                                {formatDuration(playerData.duration)}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-x-5">
                        <button className="w-6 h-6 text-xs border rounded-lg cursor-pointer border-text4">
                            MV
                        </button>
                        <button className="cursor-pointer">
                            <IconMicro></IconMicro>
                        </button>
                        <div className="flex items-center justify-center gap-x-1 ">
                            <button
                                className="cursor-pointer"
                                onClick={() => dispatch(setIsMute(!isMute))}
                            >
                                {isMute ? (
                                    <VolumeOffIcon></VolumeOffIcon>
                                ) : (
                                    <IconVolumn></IconVolumn>
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                onChange={(e) => {
                                    dispatch(
                                        setVolume(parseFloat(e.target.value))
                                    );
                                }}
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                }}
                                className="w-[70px] h-1 rounded-full bg-text4 cursor-pointer"
                            />
                        </div>
                        <div className="w-[1px] h-[33px] bg-text2 cursor-pointer"></div>
                        <button
                            className={`w-[30px] h-[30px] rounded-lg text-lite ml ${
                                showQueue ? "bg-primary" : "bg-text3"
                            }`}
                            onClick={() => {
                                dispatch(setShowQueue(!showQueue));
                            }}
                        >
                            <IconList></IconList>
                        </button>
                    </div>
                </div>
            </div>
            {typeof audioUrl === "string" && (
                <ReactPlayer
                    style={{
                        display: "none",
                    }}
                    onProgress={({ playedSeconds }) => {
                        dispatch(setCurrentProgress(playedSeconds));
                    }}
                    muted={isMute}
                    ref={playerRef}
                    playing={isPlaying}
                    url={audioUrl}
                    volume={volume}
                    onEnded={() => {
                        if (isRepeat) {
                            handleRepeat();
                        } else if (isRandom) {
                            handleRandomSong();
                        } else {
                            if (currentSongIndex === playlistQueue.length - 1) {
                                dispatch(setCurrentProgress(0));
                                dispatch(setCurrentSongIndex(0));
                                dispatch(setPlayerData(playlistQueue[0]));
                                dispatch(setIsPlaying(false));
                            } else {
                                handleNext();
                            }
                        }
                    }}
                />
            )}
        </>
    );
};

export default DashboardBottomBar;

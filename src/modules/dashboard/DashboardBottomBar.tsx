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
import { RootState } from "../../store/configureStore";
import { setIsPlaying } from "../../store/actions/playerSlice";
import { useNavigate } from "react-router-dom";
import { formatDuration } from "../../utils/formatDuration";
import { toast } from "react-toastify";
import { setShowQueue } from "../../store/actions/musicSlice";

const DashboardBottomBar = () => {
    const isPlaying = useSelector((state: RootState) => state.player.isPlaying);
    const dispatch = useDispatch();
    const playerData = useSelector(
        (state: RootState) => state.music.playerData
    );
    const isPremium = useSelector((state: RootState) => state.music.isPremium);
    const showQueue = useSelector((state: RootState) => state.music.showQueue);
    const navigate = useNavigate();
    const handlePlay = () => {
        if (!isPremium) {
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
    return (
        <div className="fixed bottom-0 left-0 right-0 h-[90px] shadow-md bg-grayf3 dark:bg-darkSoft dark:text-lite z-50">
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
                                            navigate("/nghe-si/" + artist.link)
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
                        <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary dark:hover:bg-thirdly hover:text-grayf3">
                            <IconRandom></IconRandom>
                        </button>
                        <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary dark:hover:bg-thirdly hover:text-grayf3">
                            <IconPrev></IconPrev>
                        </button>
                        <button
                            className="flex items-center justify-center w-10 h-10 border-2 rounded-full dark:text-darkBG border-darkBG bg-lite hover:bg-primary dark:hover:bg-thirdly hover:text-grayf3"
                            onClick={handlePlay}
                        >
                            {isPlaying ? <IconPause /> : <IconPlay />}
                        </button>
                        <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary dark:hover:bg-thirdly hover:text-grayf3">
                            <IconNext></IconNext>
                        </button>
                        <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary dark:hover:bg-thirdly hover:text-grayf3">
                            <IconRepeat></IconRepeat>
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-x-2">
                        <span className="text-sm font-medium">00:00</span>
                        <div className="w-[370px] h-1 rounded-full bg-text4"></div>
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
                        <button className="cursor-pointer">
                            <IconVolumn></IconVolumn>
                        </button>
                        <div className="w-[70px] h-1 rounded-full bg-text4 cursor-pointer"></div>
                    </div>
                    <div className="w-[1px] h-[33px] bg-text2 cursor-pointer"></div>
                    <button
                        className="w-[30px] h-[30px] rounded-lg bg-text3 text-lite ml"
                        onClick={() => dispatch(setShowQueue(!showQueue))}
                    >
                        <IconList></IconList>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardBottomBar;

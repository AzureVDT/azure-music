import { useDispatch, useSelector } from "react-redux";
import { IconMore } from "../../components/icons";
import { RootState } from "../../store/configureStore";
import {
    setShowPlaylist,
    setShowRecentlyPlayed,
} from "../../store/actions/musicSlice";

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
    return (
        <>
            {showQueue && (
                <div
                    className="w-[330px] h-full fixed top-0 right-0 bg-darkSoft overflow-y-scroll z-50 p-3 text-lite
            flex flex-col items-start justify-start transition-all duration-300 ease-in-out zing-scroll__bar"
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
                    <div></div>
                </div>
            )}
        </>
    );
};

export default DashboardQueue;

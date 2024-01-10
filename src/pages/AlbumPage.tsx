import { useSelector } from "react-redux";
import {
    IconLove,
    IconMicro,
    IconMore,
    IconPlay,
    IconPremium,
} from "../components/icons";
import { RootState } from "../store/configureStore";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { zingmp3Api } from "../apis/constants";
import { useDispatch } from "react-redux";
import {
    setAlbumData,
    setIsPremium,
    setPlayerData,
    setPlaylistQueue,
    setShowBottomPlayer,
    setShowPlaylist,
    setShowRecentlyPlayed,
} from "../store/actions/musicSlice";
import formatDate from "../utils/formatDate";
import { useNavigate, useParams } from "react-router-dom";
import { NewReleaseSongTypes } from "../types/newReleaseTypes";
import { formatDuration } from "../utils/formatDuration";
import AlbumTypes from "../types/albumTypes";

const AlbumPage = () => {
    // get slug from url
    const { id } = useParams();
    const albumData = useSelector((state: RootState) => state.music.albumData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchAlbumData() {
            const res = await axios.get(zingmp3Api.getAlbumPage(id!));
            dispatch(setAlbumData(res.data.data));
            dispatch(setPlaylistQueue(res.data.data.song.items));
        }
        fetchAlbumData();
    }, [dispatch, id]);
    if (!albumData) return null;
    return (
        <div className="flex items-start gap-x-10">
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
                                onClick={() =>
                                    navigate("/nghe-si/" + artist.link)
                                }
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
            <div className="flex flex-col flex-1">
                <h3 className="text-[14px] font-normal">
                    <strong className="text-primary">Lời tựa </strong>
                    <span>{albumData.sortDescription}</span>
                </h3>
                <div className="flex items-center justify-between mt-5 ml-3 text-xs font-medium">
                    <span>BÀI HÁT</span>
                    <span className="ml-10">ALBUM</span>
                    <span>THÒI GIAN</span>
                </div>
                {albumData?.song?.items.map((item) => (
                    <AlbumItem
                        key={item.encodeId}
                        item={item}
                        navigate={navigate}
                    ></AlbumItem>
                ))}
            </div>
        </div>
    );
};

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
    const handlePlay = () => {
        dispatch(setPlayerData(item));
        dispatch(setShowBottomPlayer(true));
        dispatch(setShowPlaylist(true));
        dispatch(setShowRecentlyPlayed(false));
        item.streamingStatus === 2
            ? dispatch(setIsPremium(true))
            : dispatch(setIsPremium(false));
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

export default AlbumPage;

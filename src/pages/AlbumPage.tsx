import { useEffect } from "react";
import axios from "axios";
import { zingmp3Api } from "../apis/constants";
import { useDispatch } from "react-redux";
import { setAlbumData, setPlaylistQueue } from "../store/actions/musicSlice";
import { useNavigate, useParams } from "react-router-dom";
import AlbumDetails from "../modules/album/AlbumDetails";
import AlbumItem from "../modules/album/AlbumItem";
import AlbumSinger from "./AlbumSinger";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";

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
        if (albumData.encodeId !== id) fetchAlbumData();
    }, [albumData.encodeId, dispatch, id]);
    if (!albumData.encodeId || albumData.encodeId !== id) return null;
    return (
        <>
            <div className="flex items-start gap-x-10">
                <AlbumDetails
                    albumData={albumData}
                    navigate={navigate}
                ></AlbumDetails>
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
            <div className="mt-10">
                <h3 className="mb-10 text-xl font-bold">Nghệ Sĩ Tham Gia</h3>
                <div className="flex items-center justify-around">
                    {albumData?.artists?.map((artist) => (
                        <AlbumSinger
                            key={artist.id}
                            artist={artist}
                        ></AlbumSinger>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AlbumPage;

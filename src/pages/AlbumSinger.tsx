import { useState } from "react";
import { IconFollow, IconRandom } from "../components/icons";
import { ArtistsItemTypes } from "../types/newReleaseTypes";

const AlbumSinger = ({ artist }: { artist: ArtistsItemTypes }) => {
    const [isFollow, setIsFollow] = useState(false);
    if (!artist) return null;
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-[214px] h-[214px] rounded-full">
                <img
                    src={artist.thumbnailM}
                    alt=""
                    className="object-cover w-full h-full rounded-full"
                />
            </div>
            <h4 className="mt-4 text-sm font-medium">{artist.name}</h4>
            <span className="text-xs font-normal">
                {artist.totalFollow
                    ? Math.round(artist.totalFollow / 1000) > 0
                        ? `${Math.round(artist.totalFollow / 1000)}K`
                        : artist.totalFollow
                    : `0K`}
            </span>
            <button
                className={`w-[125px] h-[30px] rounded-full text-lite mt-4  flex items-center justify-center gap-x-1 ${
                    isFollow ? "bg-secondary" : "bg-primary"
                }`}
                onClick={() => setIsFollow(!isFollow)}
            >
                {isFollow ? (
                    <IconRandom className="w-4 h-4" />
                ) : (
                    <IconFollow className="w-4 h-4" />
                )}
                <span className="text-sm font-normal">
                    {isFollow ? "Góc nhạc" : "Quan tâm"}
                </span>
            </button>
        </div>
    );
};

export default AlbumSinger;

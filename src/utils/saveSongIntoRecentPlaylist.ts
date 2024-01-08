import { NewReleaseSongTypes } from "../types/newReleaseTypes";

export default function saveSongIntoRecentPlaylist(item: NewReleaseSongTypes) {
    const recentlyPlayed = localStorage.getItem("azure-music-recently-played");
    if (recentlyPlayed) {
        const recentlyPlayedArray = JSON.parse(recentlyPlayed);
        const isExist = recentlyPlayedArray.some(
            (song: NewReleaseSongTypes) => song.encodeId === item.encodeId
        );
        if (!isExist) {
            recentlyPlayedArray.push(item);
            localStorage.setItem(
                "azure-music-recently-played",
                JSON.stringify(recentlyPlayedArray)
            );
        }
    } else {
        localStorage.setItem(
            "azure-music-recently-played",
            JSON.stringify([item])
        );
    }
}

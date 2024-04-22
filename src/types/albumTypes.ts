import { ArtistsItemTypes, NewReleaseSongTypes } from "./newReleaseTypes";

type AlbumTypes = {
    encodeId: string;
    title: string;
    thumbnail: string;
    isOfficial: boolean;
    link: string;
    isIndie: boolean;
    releaseDate: string;
    sortDescription: string;
    releasedAt: number;
    genreIds: string[];
    PR: boolean;
    artists: ArtistsItemTypes[];
    artistNames: string;
    playItemMode: number;
    subType: number;
    uid: number;
    thumbnailM: string;
    isShuffle: boolean;
    isPrivate: boolean;
    userName: string;
    isAlbum: boolean;
    contentLastUpdate: number;
    artist: {
        id: string;
        name: string;
        link: string;
        spotlight: boolean;
        alias: string;
        playlistId: string;
        cover: string;
        thumbnail: string;
    };
    genres: {
        id: string;
        name: string;
        title: string;
        alias: string;
        link: string;
    }[];
    song: {
        items: NewReleaseSongTypes[];
    };
    like: number;
    listen: number;
    liked: boolean;
};

type AlbumItemTypes = {
    encodedId: string;
    title: string;
    thumbnail: string;
    isOfficial: boolean;
    link: string;
    isIndie: boolean;
    releaseDate: string;
    sortDescription: string;
    releaseAt: number;
    genreIds: string[];
    PR: boolean;
    artists: ArtistsItemTypes[];
    artistNames: string;
};

export type { AlbumItemTypes };

export default AlbumTypes;

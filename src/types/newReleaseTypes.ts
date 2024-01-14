import { AlbumItemTypes } from "./albumTypes";

type NewReleaseTypes = {
    items: NewReleaseItemTypes;
    link: string;
    sectionType: string;
    title: string;
};

type NewReleaseItemTypes = {
    all: NewReleaseSongTypes[];
    others: NewReleaseSongTypes[];
    vPop: NewReleaseSongTypes[];
};

type NewReleaseSongTypes = {
    encodeId: string;
    title: string;
    alias: string;
    artistsNames: string;
    isWorldWide: string;
    artists: ArtistsItemTypes[];
    thumbnailM: string;
    link: string;
    thumbnail: string;
    duration: number;
    isPrivate: boolean;
    releaseDate: number;
    genreIds: string[];
    streamingStatus: number;
    album?: AlbumItemTypes;
};

type ArtistsItemTypes = {
    id: string;
    name: string;
    link: string;
    spotlight: boolean;
    alias: string;
    thumbnail: string;
    thumbnailM: string;
    playlistId: string;
    totalFollow?: number;
};

export type { NewReleaseItemTypes, NewReleaseSongTypes, ArtistsItemTypes };

export default NewReleaseTypes;

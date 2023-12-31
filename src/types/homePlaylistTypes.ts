type HomePlaylistTypes = {
    sectionType: string;
    viewType: string;
    title: string;
    link: string;
    sectionId: string;
    items: HomePlaylistItemTypes[];
};

type HomePlaylistItemTypes = {
    encodeId: string;
    title: string;
    thumbnail: string;
    sortDescription: string;
    duration: string;
    link: string;
    genreIds: string[];
    artists: HomePlaylistArtistTypes[];
    artistsNames: string;
    thumbnailM: string;
    isPrivate: boolean;
};

type HomePlaylistArtistTypes = {
    id: string;
    name: string;
    link: string;
    spotlight: boolean;
    alias: string;
    thumbnail: string;
    thumbnailM: string;
    playlistId: string;
    totalFollow: number;
};

export default HomePlaylistTypes;
export type { HomePlaylistItemTypes, HomePlaylistArtistTypes };

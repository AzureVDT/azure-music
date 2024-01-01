import { ArtistsItemTypes } from "./newReleaseTypes";

type ChartTypes = {
    promotes: [];
    items: ChartSongTypes[];
    chart: ChartItemTypes;
    chartType: string;
    sectionType: string;
    sectionId: string;
};

type ChartSongTypes = {
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
    album: {
        encodeId: string;
        title: string;
        thumbnail: string;
        link: string;
        releaseDate: string;
        releasedAt: number;
        genreIds: string[];
        artists: ArtistsItemTypes[];
        artistsNames: string;
    };
    streamingStatus: number;
    score: number;
    rakingStatus: number;
    totalTopZing: number;
};

type ChartItemTypes = {
    times: {
        hour: string;
    }[];
    minScore: number;
    maxScore: number;
    items: ItemsType;
    totalScore: number;
};

type TimeCounterItem = {
    time: number;
    hour: string;
    counter: number;
};

type ItemsType = Record<string, TimeCounterItem[]>;

export default ChartTypes;

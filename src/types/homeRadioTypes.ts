type HomeRadioTypes = {
    sectionType: string;
    viewType: string;
    title: string;
    link: string;
    sectionId: string;
    items: HomeRadioItemTypes[];
};

type HomeRadioItemTypes = {
    id: string;
    encodeId: string;
    title: string;
    thumbnail: string;
    thumbnailM: string;
    thumbnailV: string;
    thumbnailH: string;
    description: string;
    status: number;
    type: string;
    link: string;
    streaming: string;
    host: {
        name: string;
        encodeId: string;
        thumbnail: string;
        link: string;
    };
    activeUsers: number;
    program: {
        encodeId: string;
        title: string;
        thumbnail: string;
        startTime: number;
        endTime: number;
        hasSongRequest: boolean;
    };
};

export default HomeRadioTypes;
export type { HomeRadioItemTypes };

type BannerTypes = {
    items: BannerItemTypes[];
    link: string;
    sectionId: string;
    sectionType: string;
    title: string;
    viewType: string;
};

type BannerItemTypes = {
    banner: string;
    cover: string;
    encodeId: string;
    link: string;
};

export default BannerTypes;
export type { BannerItemTypes };

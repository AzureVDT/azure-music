import BannerTypes from "../types/bannerTypes";

const useSeparateHomeData = (homeData: Array<BannerTypes>) => {
    const bannerData = homeData.filter(
        (item: BannerTypes) => item.sectionType === "banner"
    )[0];

    const newReleaseData = homeData.filter(
        (item: BannerTypes) => item.sectionType === "new-release"
    )[0];
    const newReleaseChart = homeData.filter(
        (item: BannerTypes) => item.sectionType === "newReleaseChart"
    )[0];
    const playlistData = homeData.filter(
        (item: BannerTypes) => item.sectionType === "playlist"
    )[0];
    const zingChart = homeData.filter(
        (item: BannerTypes) => item.sectionType === "RTChart"
    )[0];
    return {
        bannerData,
        newReleaseData,
        newReleaseChart,
        playlistData,
        zingChart,
    };
};

export default useSeparateHomeData;

import BannerTypes from "../types/bannerTypes";
import NewReleaseTypes from "../types/newReleaseTypes";

const useSeparateHomeData = (
    homeData: Array<BannerTypes | NewReleaseTypes>
) => {
    const bannerData = homeData.filter(
        (item): item is BannerTypes => item.sectionType === "banner"
    )[0];

    const newReleaseData = homeData.filter(
        (item): item is NewReleaseTypes => item.sectionType === "new-release"
    )[0];
    // const newReleaseChart = homeData.filter(
    //     (item: BannerTypes) => item.sectionType === "newReleaseChart"
    // )[0];
    // const playlistData = homeData.filter(
    //     (item: BannerTypes) => item.sectionType === "playlist"
    // )[0];
    // const zingChart = homeData.filter(
    //     (item: BannerTypes) => item.sectionType === "RTChart"
    // )[0];
    return {
        bannerData,
        newReleaseData,
        // newReleaseChart,
        // playlistData,
        // zingChart,
    };
};

export default useSeparateHomeData;

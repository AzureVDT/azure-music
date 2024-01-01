import BannerTypes from "../types/bannerTypes";
import ChartTypes from "../types/chartTypes";
import HomePlaylistTypes from "../types/homePlaylistTypes";
import HomeRadioTypes from "../types/homeRadioTypes";
import NewReleaseTypes from "../types/newReleaseTypes";

const useSeparateHomeData = (
    homeData: Array<
        | BannerTypes
        | NewReleaseTypes
        | HomePlaylistTypes
        | HomeRadioTypes
        | ChartTypes
    >
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
    const playlistData = homeData.filter(
        (item): item is HomePlaylistTypes => item.sectionType === "playlist"
    );
    const zingChart = homeData.filter(
        (item): item is ChartTypes => item.sectionType === "RTChart"
    )[0];
    const homeRadioData = homeData.filter(
        (item): item is HomeRadioTypes => item.sectionType === "livestream"
    )[0];
    return {
        bannerData,
        newReleaseData,
        // newReleaseChart,
        playlistData,
        zingChart,
        homeRadioData,
    };
};

export default useSeparateHomeData;

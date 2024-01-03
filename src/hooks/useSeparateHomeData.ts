import BannerTypes from "../types/bannerTypes";
import ChartTypes from "../types/chartTypes";
import HomePlaylistTypes from "../types/homePlaylistTypes";
import HomeRadioTypes from "../types/homeRadioTypes";
import HomeWeekChartTypes from "../types/homeWeekChartTypes";
import NewReleaseTypes from "../types/newReleaseTypes";

const useSeparateHomeData = (
    homeData: Array<
        | BannerTypes
        | NewReleaseTypes
        | HomePlaylistTypes
        | HomeRadioTypes
        | ChartTypes
        | HomeWeekChartTypes
    >
) => {
    const bannerData = homeData.filter(
        (item): item is BannerTypes => item.sectionType === "banner"
    )[0];

    const newReleaseData = homeData.filter(
        (item): item is NewReleaseTypes => item.sectionType === "new-release"
    )[0];
    const weekChartData = homeData.filter(
        (item): item is HomeWeekChartTypes => item.sectionType === "weekChart"
    )[0];
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
        weekChartData,
        playlistData,
        zingChart,
        homeRadioData,
    };
};

export default useSeparateHomeData;

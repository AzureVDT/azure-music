import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setHomeData } from "../store/actions/musicSlice";
import { RootState } from "../store/configureStore";
import useSeparateHomeData from "../hooks/useSeparateHomeData";
import { zingmp3Api } from "../apis/constants";
import Banner from "../modules/home/Banner";
import NewRelease from "../modules/home/NewRelease";
import Playlist from "../modules/home/Playlist";
import Radio from "../modules/home/Radio";
import ZingChart from "../modules/home/ZingChart";
import WeekChart from "../modules/home/WeekChart";

const DashboardPage = () => {
    const apiUrl = zingmp3Api.getHomePage();
    const dispatch = useDispatch();
    const homeData = useSelector((state: RootState) => state.music.homeData);
    const {
        bannerData,
        newReleaseData,
        playlistData,
        homeRadioData,
        zingChart,
        weekChartData,
    } = useSeparateHomeData(homeData);
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(apiUrl);
            dispatch(setHomeData(res.data.data.items));
        }
        fetchData();
    }, [apiUrl, dispatch]);
    if (homeData.length === 0) return null;
    return (
        <>
            <Banner data={bannerData}></Banner>
            <NewRelease data={newReleaseData}></NewRelease>
            <ZingChart data={zingChart}></ZingChart>
            <WeekChart data={weekChartData}></WeekChart>
            <Playlist data={playlistData}></Playlist>
            <Radio data={homeRadioData}></Radio>
        </>
    );
};

export default DashboardPage;

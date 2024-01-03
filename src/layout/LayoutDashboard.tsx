import { Outlet } from "react-router-dom";
import Overlay from "../components/common/OverLay";
import DashboardTopBar from "../modules/dashboard/DashboardTopBar";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import DashboardSideBar from "../modules/dashboard/DashboardSidebar";
import DashboardBottomBar from "../modules/dashboard/DashboardBottomBar";

const LayoutDashboard = () => {
    const showSearch = useSelector(
        (state: RootState) => state.search.showSearch
    );
    const showBottomPlayer = useSelector(
        (state: RootState) => state.music.showBottomPlayer
    );
    return (
        <div className="min-h-screen p-5 bg-lite dark:bg-darkBG">
            <Overlay isOpen={showSearch}></Overlay>
            <DashboardTopBar></DashboardTopBar>
            <DashboardSideBar></DashboardSideBar>
            {showBottomPlayer && <DashboardBottomBar></DashboardBottomBar>}
            <div className="px-32 py-20">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default LayoutDashboard;

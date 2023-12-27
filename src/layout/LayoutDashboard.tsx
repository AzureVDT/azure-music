import { Outlet } from "react-router-dom";
import Overlay from "../components/common/OverLay";
import DashboardTopBar from "../modules/dashboard/DashboardTopBar";
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";
import DashboardSideBar from "../modules/dashboard/DashboardSidebar";

const LayoutDashboard = () => {
    const showSearch = useSelector(
        (state: RootState) => state.search.showSearch
    );
    return (
        <div className="min-h-screen p-5 bg-lite">
            <Overlay isOpen={showSearch}></Overlay>
            <DashboardTopBar></DashboardTopBar>
            <div className="flex items-start gap-x-10">
                <DashboardSideBar></DashboardSideBar>
                <div className="flex-1">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default LayoutDashboard;

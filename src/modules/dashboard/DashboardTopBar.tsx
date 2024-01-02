import { useDispatch, useSelector } from "react-redux";
import { IconMenu } from "../../components/icons";
import DashboardSearch from "./DashboardSearch";
import { Link } from "react-router-dom";
import { setShowMenu } from "../../store/actions/searchSlice";
import { RootState } from "../../store/configureStore";

const DashboardTopBar = () => {
    const showMenu = useSelector((state: RootState) => state.search.showMenu);
    const dispatch = useDispatch();
    return (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-between">
            <div className="flex items-center flex-1 gap-x-10">
                <Link to={"/"} className="inline-block px-[16px]">
                    <img
                        srcSet="/logo.png 2x"
                        alt="azure-music"
                        className="object-cover w-[48px]"
                    />
                </Link>
                <div className="max-w-[458px] w-full">
                    <DashboardSearch></DashboardSearch>
                </div>
                <button
                    className="w-12 h-12 md:hidden"
                    onClick={() => dispatch(setShowMenu(!showMenu))}
                >
                    <IconMenu></IconMenu>
                </button>
            </div>
        </div>
    );
};

export default DashboardTopBar;

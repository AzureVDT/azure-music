import { useDispatch, useSelector } from "react-redux";
import {
    IconArrowLeft,
    IconArrowRight,
    IconMenu,
} from "../../components/icons";
import DashboardSearch from "./DashboardSearch";
import { Link } from "react-router-dom";
import { setShowMenu } from "../../store/actions/searchSlice";
import { RootState } from "../../store/configureStore";

const DashboardTopBar = () => {
    const showMenu = useSelector((state: RootState) => state.search.showMenu);
    const dispatch = useDispatch();
    const prevPath = useSelector((state: RootState) => state.common.prevPath);
    const nextPath = useSelector((state: RootState) => state.common.nextPath);
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
                <div className="flex items-center justify-center gap-x-3 dark:text-white text-primary">
                    <button
                        className={!prevPath ? "text-text2" : ""}
                        disabled={!prevPath}
                        onClick={() => navigate}
                    >
                        <IconArrowLeft />
                    </button>
                    <button
                        className={!nextPath ? "text-text2" : ""}
                        disabled={!nextPath}
                        onClick={() => navigate}
                    >
                        <IconArrowRight />
                    </button>
                </div>
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

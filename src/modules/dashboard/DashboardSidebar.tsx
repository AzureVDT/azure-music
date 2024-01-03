import { NavLink } from "react-router-dom";
import {
    IconDarkMode,
    IconExplore,
    IconLibrary,
    IconLightMode,
    IconLogout,
    IconRadio,
    IconSetting,
} from "../../components/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import useDarkMode from "../../hooks/useDarkMode";
import { toggleDarkMode } from "../../store/actions/playerSlice";

const sidebarLinks = [
    {
        icon: <div></div>,
        title: "Profile",
        url: "/profile",
    },
    {
        icon: <IconExplore></IconExplore>,
        title: "Explore",
        url: "/",
    },
    {
        icon: <IconRadio></IconRadio>,
        title: "Radio",
        url: "/radio",
    },
    {
        icon: <IconLibrary></IconLibrary>,
        title: "Library",
        url: "/library",
    },
    {
        iconDark: <IconDarkMode></IconDarkMode>,
        iconLight: <IconLightMode></IconLightMode>,
        title: "Light/Dark",
        url: "#",
    },
    {
        icon: <IconSetting></IconSetting>,
        title: "Setting",
        url: "/setting",
    },
    {
        icon: <IconLogout></IconLogout>,
        title: "Logout",
        url: "/logout",
    },
];
const sidebarClass =
    "flex items-center gap-x-5 md:w-12 md:h-12 md:justify-center mb-5 md:rounded-lg md:mb-8 md:last:mt-5 dark:text-lite";
const DashboardSideBar = () => {
    const dispatch = useDispatch();
    const showMenu = useSelector((state: RootState) => state.search.showMenu);
    const [darkMode, setDarkMode] = useDarkMode();
    const handleToggleDarkMode = () => {
        if (typeof setDarkMode === "function") {
            setDarkMode(!darkMode);
            dispatch(toggleDarkMode(!darkMode));
        }
    };
    return (
        <div
            className={`w-full md:w-[76px] bg-white dark:bg-darkBG rounded-3xl dark:rounded-none
            shadow-[10px_10px_20px_0px_rgba(218,_213,_213,_0.15)] dark:text-lite
            px-[14px] py-10 flex-col flex-shrink-0 fixed top-10 bottom-0 left-0 md:flex ${
                showMenu ? "flex" : "hidden"
            }`}
        >
            {sidebarLinks.map((link) => {
                if (link.url === "/logout") {
                    return (
                        <button
                            key={link.title}
                            className={sidebarClass}
                            title={link.title}
                        >
                            <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
                                {link.icon}
                            </span>
                            <span className="md:hidden">{link.title}</span>
                        </button>
                    );
                } else if (link.url === "/profile") {
                    return (
                        <NavLink
                            to={link.url}
                            key={link.title}
                            className={({ isActive }) =>
                                isActive
                                    ? `bg-primary text-lite dark:bg-thirdly ${sidebarClass}`
                                    : `text-iconColor ${sidebarClass}`
                            }
                            title={link.title}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1615958354408-c15ad934a549?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Profile"
                                className="object-cover w-10 h-10 rounded-full md:w-12 md:h-12"
                            />
                            <span className="md:hidden">{link.title}</span>
                        </NavLink>
                    );
                } else if (link.url === "#") {
                    return (
                        <button
                            key={link.title}
                            className={sidebarClass}
                            title={link.title}
                            onClick={handleToggleDarkMode}
                        >
                            <span
                                className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 ${
                                    darkMode
                                        ? "bg-thirdly text-lite rounded-lg"
                                        : `bg-primary text-lite rounded-lg`
                                }`}
                            >
                                {darkMode ? link.iconDark : link.iconLight}
                            </span>
                            <span className="md:hidden">{link.title}</span>
                        </button>
                    );
                }
                return (
                    <NavLink
                        to={link.url}
                        key={link.title}
                        className={({ isActive }) =>
                            isActive
                                ? `bg-primary text-lite dark:bg-thirdly ${sidebarClass}`
                                : `text-iconColor ${sidebarClass}`
                        }
                        title={link.title}
                    >
                        <span className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
                            {link.icon}
                        </span>
                        <span className="md:hidden">{link.title}</span>
                    </NavLink>
                );
            })}
        </div>
    );
};

export default DashboardSideBar;

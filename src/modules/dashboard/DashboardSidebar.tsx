import { NavLink } from "react-router-dom";
import {
    IconDarkMode,
    IconExplore,
    IconLibrary,
    IconLogout,
    IconRadio,
    IconSetting,
} from "../../components/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";

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
        icon: <IconDarkMode></IconDarkMode>,
        title: "Light/Dark",
        url: "#",
        onClick: () => {},
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
    "flex items-center gap-x-5 md:w-12 md:h-12 md:justify-center mb-5 md:rounded-lg md:mb-8 md:last:mt-auto last:bg-white md:last:shadow-sdprimary";
const DashboardSideBar = () => {
    const showMenu = useSelector((state: RootState) => state.search.showMenu);
    return (
        <div
            className={`w-full md:w-[76px] bg-white rounded-3xl shadow-[10px_10px_20px_0px_rgba(218,_213,_213,_0.15)] 
            px-[14px] py-10 flex-col flex-shrink-0 fixed top-20 bottom-0 md:left-5 left-0 md:flex ${
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
                                    ? `bg-primary text-primary bg-opacity-20 ${sidebarClass}`
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
                }
                return (
                    <NavLink
                        to={link.url}
                        key={link.title}
                        className={({ isActive }) =>
                            isActive
                                ? `bg-primary text-primary bg-opacity-20 ${sidebarClass}`
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

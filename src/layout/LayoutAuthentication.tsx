import React from "react";
import { Link } from "react-router-dom";

const LayoutAuthentication = ({
    children,
    heading,
}: {
    children: React.ReactNode;
    heading: string;
}) => {
    return (
        <div className="relative w-full min-h-screen p-10 bg-lite dark:bg-darkBG isolate">
            <img
                src="/ellipse.png"
                alt="background"
                className="hidden lg:block pointer-events-none absolute bottom-0 left-0 right-0 z-[-1]"
            />
            <Link to={"/"} className="inline-block mb-5 lg:mb-16">
                <img srcSet="/logo.png 2x" alt="azure-music-app" />
            </Link>
            <div className="w-full max-w-[556px] bg-white dark:bg-darkSecondary rounded-xl px-5 py-8 lg:px-12 lg:py-16 mx-auto">
                <h1 className="mb-1 text-lg font-semibold text-center lg:text-xl lg:mb-3 dark:text-white">
                    {heading}
                </h1>
                {children}
            </div>
        </div>
    );
};

export default LayoutAuthentication;

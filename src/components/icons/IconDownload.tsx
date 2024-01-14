const IconDownload = (props: JSX.IntrinsicElements["svg"]) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
            {...props}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15l5-5H7l5 5zm-5 2v2h10v-2H7zm5-13v12"
            />
        </svg>
    );
};

export default IconDownload;

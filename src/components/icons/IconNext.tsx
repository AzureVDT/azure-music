const IconNext = (props: JSX.IntrinsicElements["svg"]) => {
    return (
        <svg
            width={26}
            height={26}
            viewBox="0 0 26 26"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M14.6742 12.8436C15.2917 12.4507 15.2917 11.5493 14.6742 11.1563L6.53688 5.978C5.87115 5.55436 5 6.03257 5 6.82166V17.1783C5 17.9674 5.87115 18.4456 6.53688 18.022L14.6742 12.8436Z"
                fill="currentColor"
            />
            <rect
                x={17}
                y={5}
                width={2}
                height={14}
                rx={1}
                fill="currentColor"
            />
        </svg>
    );
};

export default IconNext;

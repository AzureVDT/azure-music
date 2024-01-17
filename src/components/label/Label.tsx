import classNames from "../../utils/classNames";
const Label = ({
    children,
    htmlFor = "",
    className = "",
}: {
    children: React.ReactNode;
    htmlFor?: string;
    className?: string;
}) => {
    return (
        <label
            className={classNames(
                "inline-block self-start text-sm font-medium cursor-pointer dark:text-text3 text-text2",
                className
            )}
            htmlFor={htmlFor}
        >
            {children}
        </label>
    );
};

export default Label;

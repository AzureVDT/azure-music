/* eslint-disable react-refresh/only-export-components */
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../common/ErrorComponent";
const ButtonFacebook = ({ text = "", onClick = () => {} }) => {
    return (
        <button
            className="flex items-center justify-center w-full py-3 mb-5 text-base font-semibold border gap-x-3 border-strock rounded-xl text-text2 dark:text-white dark:border-text3"
            onClick={onClick}
        >
            <img srcSet="/icon-fb.png 2x" alt="icon-fb" />
            <span>{text}</span>
        </button>
    );
};
export default withErrorBoundary(ButtonFacebook, {
    FallbackComponent: ErrorComponent,
});

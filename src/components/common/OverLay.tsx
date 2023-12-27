const Overlay = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <div
            className={`fixed inset-0 z-40 bg-black bg-opacity-10 ${
                isOpen ? "" : "opacity-0 invisible"
            }`}
        ></div>
    );
};

export default Overlay;

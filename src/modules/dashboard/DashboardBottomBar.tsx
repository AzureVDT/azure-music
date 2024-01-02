import {
    IconList,
    IconLove,
    IconMicro,
    IconMore,
    IconNext,
    IconPause,
    IconPrev,
    IconRandom,
    IconRepeat,
    IconVolumn,
} from "../../components/icons";

const DashboardBottomBar = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-[90px] shadow-md bg-grayf3 z-50">
            <div className="flex items-center justify-between px-5">
                <div className="flex items-center justify-center mt-3 gap-x-3">
                    <div>
                        <img
                            src="https://source.unsplash.com/random"
                            alt=""
                            className="object-cover w-16 h-16 rounded-md"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-x-5">
                        <div>
                            <h3 className="text-lg font-medium">
                                Bỏ Em Vào Balo
                            </h3>
                            <span className="text-sm font-normal text-text3">
                                Tân Trần, Freak D
                            </span>
                        </div>
                        <div className="flex items-center justify-center gap-x-2">
                            <IconLove className="text-text4"></IconLove>
                            <IconMore className="text-text4"></IconMore>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center mt-2 gap-y-2">
                    <div className="flex items-center justify-center gap-x-5">
                        <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary hover:text-grayf3">
                            <IconRandom></IconRandom>
                        </button>
                        <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary hover:text-grayf3">
                            <IconPrev></IconPrev>
                        </button>
                        <button className="flex items-center justify-center w-10 h-10 border-2 rounded-full border-darkBG bg-lite hover:bg-primary hover:text-grayf3">
                            <IconPause></IconPause>
                        </button>
                        <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary hover:text-grayf3">
                            <IconNext></IconNext>
                        </button>
                        <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-primary hover:text-grayf3">
                            <IconRepeat></IconRepeat>
                        </button>
                    </div>
                    <div className="flex items-center justify-center gap-x-2">
                        <span className="text-sm font-medium">00:00</span>
                        <div className="w-[370px] h-1 rounded-full bg-text4"></div>
                        <span className="text-sm font-medium">04:35</span>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-x-5">
                    <button className="w-6 h-6 text-xs border rounded-lg border-text4">
                        MV
                    </button>
                    <button>
                        <IconMicro></IconMicro>
                    </button>
                    <div className="flex items-center justify-center gap-x-1">
                        <button>
                            <IconVolumn></IconVolumn>
                        </button>
                        <div className="w-[70px] h-1 rounded-full bg-text4"></div>
                    </div>
                    <div className="w-[1px] h-[33px] bg-text2"></div>
                    <button className="w-[30px] h-[30px] rounded-lg bg-text3 text-lite ml">
                        <IconList></IconList>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardBottomBar;

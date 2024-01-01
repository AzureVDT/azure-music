import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { setShowSearch } from "../../store/actions/searchSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { zingmp3Api } from "../../apis/constants";
import { v4 as uuidv4 } from "uuid";
import { IconTrend } from "../../components/icons";

const DashboardSearch = () => {
    const showSearch = useSelector(
        (state: RootState) => state.search.showSearch
    );
    const dispatch = useDispatch();
    const [hotSearch, setHotSearch] = useState([]);
    useEffect(() => {
        async function fetchHotSearch() {
            const res = await axios.get(zingmp3Api.getHotKeyApi());
            const data = res.data.data;
            setHotSearch(data);
        }
        fetchHotSearch();
    }, []);
    return (
        <div className="relative z-50">
            <div
                className="bg-white rounded-full shadow-[10px_10px_20px_rgba(218,_213,_213,_0.15)] p-2 w-full flex items-center md:w-[450px]"
                onClick={() => dispatch(setShowSearch(true))}
            >
                <div className="flex-1 px-5">
                    <input
                        type="text"
                        placeholder="Search songs, albums, artists, playlists, etc..."
                        className="w-full text-sm bg-transparent placeholder:text-text4 text-text1"
                    />
                </div>
                <button className="w-[72px] rounded-full bg-primary text-white h-10 flex items-center justify-center flex-shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </button>
            </div>
            {showSearch && (
                <div className="search-results w-full lg:w-[500px] absolute top-full left-0 bg-white z-50 translate-y-5 pb-6 rounded-3xl">
                    <div className="flex items-center justify-between p-3 bg-graySoft rounded-3xl">
                        <h4 className="pl-4 text-lg font-bold">
                            Đề xuất cho bạn
                        </h4>
                        <button
                            className="flex items-center justify-center w-[72px] h-[50px] rounded-xl bg-error bg-opacity-20 text-error"
                            onClick={() => dispatch(setShowSearch(false))}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="px-6 py-4 pt-0 pb-0">
                        {/* <div className="flex flex-col mb-6 gap-y-5">
                            <SearchItem></SearchItem>
                            <SearchItem></SearchItem>
                            <SearchItem></SearchItem>
                            <SearchItem></SearchItem>
                        </div> */}
                        <div className="flex flex-col text-sm gap-y-3 text-text2">
                            {hotSearch.map(
                                (item: { keyword: string; link: string }) => (
                                    <div
                                        key={uuidv4()}
                                        className="flex items-center p-2 rounded-lg cursor-pointer gap-x-3 hover:text-primary hover:bg-tertiary"
                                    >
                                        <IconTrend></IconTrend>
                                        <p>{item.keyword}</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// function SearchItem() {
//     return (
//         <div className="flex items-center gap-x-5">
//             <img
//                 src={`https://source.unsplash.com/random`}
//                 className="w-[50px] h-[50px] rounded-lg object-cover"
//                 alt=""
//             />
//             <div className="flex-1 text-sm">
//                 <h3 className="mb-1">
//                     <strong>Education</strong> fund for Durgham Family
//                 </h3>
//                 <p className="text-text3">By Durgham Family</p>
//             </div>
//         </div>
//     );
// }

export default DashboardSearch;

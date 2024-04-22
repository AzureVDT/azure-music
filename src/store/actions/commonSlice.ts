import { createSlice } from "@reduxjs/toolkit";
import { NewReleaseSongTypes } from "../../types/newReleaseTypes";

type MusicStateTypes = {
    playListQueueTemp: NewReleaseSongTypes[];
    prevPath: string;
    nextPath: string;
};

const initialState: MusicStateTypes = {
    playListQueueTemp: [],
    prevPath: "",
    nextPath: "",
};

const musicSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setPlayListQueueTemp: (state, action) => {
            state.playListQueueTemp = action.payload;
        },
        setPrevPath: (state, action) => {
            state.prevPath = action.payload;
        },
        setNextPath: (state, action) => {
            state.nextPath = action.payload;
        },
    },
});

export const { setPlayListQueueTemp, setPrevPath, setNextPath } =
    musicSlice.actions;
export default musicSlice.reducer;

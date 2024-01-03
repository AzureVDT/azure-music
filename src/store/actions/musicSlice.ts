import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewReleaseSongTypes } from "../../types/newReleaseTypes";

type MusicStateTypes = {
    homeData: [];
    showBottomPlayer: boolean;
    playerData: NewReleaseSongTypes;
};

const initialState: MusicStateTypes = {
    homeData: [],
    showBottomPlayer: false,
    playerData: {} as NewReleaseSongTypes,
};

const musicSlice = createSlice({
    name: "music",
    initialState,
    reducers: {
        setHomeData: (state, action) => {
            state.homeData = action.payload;
        },
        setShowBottomPlayer: (state, action: PayloadAction<boolean>) => {
            state.showBottomPlayer = action.payload;
        },
        setPlayerData: (state, action: PayloadAction<NewReleaseSongTypes>) => {
            state.playerData = action.payload;
        },
    },
});

export const { setHomeData, setShowBottomPlayer, setPlayerData } =
    musicSlice.actions;
export default musicSlice.reducer;

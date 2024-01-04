import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewReleaseSongTypes } from "../../types/newReleaseTypes";

type MusicStateTypes = {
    homeData: [];
    showBottomPlayer: boolean;
    playerData: NewReleaseSongTypes;
    isPremium: boolean;
    showQueue: boolean;
    showPlaylist: boolean;
    showRecentlyPlayed: boolean;
};

const initialState: MusicStateTypes = {
    isPremium: false,
    homeData: [],
    showBottomPlayer: false,
    playerData: {} as NewReleaseSongTypes,
    showQueue: false,
    showPlaylist: true,
    showRecentlyPlayed: false,
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
        setIsPremium: (state, action: PayloadAction<boolean>) => {
            state.isPremium = action.payload;
        },
        setShowQueue: (state, action: PayloadAction<boolean>) => {
            state.showQueue = action.payload;
        },
        setShowPlaylist: (state, action: PayloadAction<boolean>) => {
            state.showPlaylist = action.payload;
        },
        setShowRecentlyPlayed: (state, action: PayloadAction<boolean>) => {
            state.showRecentlyPlayed = action.payload;
        },
    },
});

export const {
    setHomeData,
    setShowBottomPlayer,
    setPlayerData,
    setIsPremium,
    setShowQueue,
    setShowPlaylist,
    setShowRecentlyPlayed,
} = musicSlice.actions;
export default musicSlice.reducer;

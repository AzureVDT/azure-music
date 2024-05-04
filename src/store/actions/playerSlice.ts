import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PlayerStateTypes = {
    isDarkMode: boolean;
    isPlaying: boolean;
    currentProgress: number;
    volume: number;
    currentSongId: string;
    currentSongIndex: number;
    isRandom: boolean;
    isRepeat: boolean;
    isMute: boolean;
};

const initialState: PlayerStateTypes = {
    isPlaying: false,
    isDarkMode:
        localStorage.getItem("dark-mode-enabled") === "true" ? true : false,
    currentProgress: 0,
    volume: 0.5,
    currentSongId: "",
    currentSongIndex: 0,
    isRandom: false,
    isRepeat: false,
    isMute: false,
};

const playerSlice = createSlice({
    name: "player",
    initialState,
    reducers: {
        setIsPlaying: (state, action: PayloadAction<boolean>) => {
            state.isPlaying = action.payload;
        },
        toggleDarkMode: (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        },
        setCurrentProgress: (state, action: PayloadAction<number>) => {
            state.currentProgress = action.payload;
        },
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        setCurrentSongId: (state, action: PayloadAction<string>) => {
            state.currentSongId = action.payload;
        },
        setCurrentSongIndex: (state, action: PayloadAction<number>) => {
            state.currentSongIndex = action.payload;
        },
        setIsMute: (state, action: PayloadAction<boolean>) => {
            state.isMute = action.payload;
        },
        setIsRepeat: (state, action: PayloadAction<boolean>) => {
            state.isRepeat = action.payload;
        },
        setIsRandom: (state, action: PayloadAction<boolean>) => {
            state.isRandom = action.payload;
        },
    },
});

export const {
    setIsPlaying,
    toggleDarkMode,
    setCurrentProgress,
    setVolume,
    setCurrentSongIndex,
    setIsMute,
    setIsRepeat,
    setIsRandom,
} = playerSlice.actions;
export default playerSlice.reducer;

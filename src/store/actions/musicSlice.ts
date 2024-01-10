import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewReleaseSongTypes } from "../../types/newReleaseTypes";
import { HomePlaylistItemTypes } from "../../types/homePlaylistTypes";
import AlbumTypes from "../../types/albumTypes";

type MusicStateTypes = {
    homeData: [];
    showBottomPlayer: boolean;
    playerData: NewReleaseSongTypes;
    isPremium: boolean;
    showQueue: boolean;
    showPlaylist: boolean;
    showRecentlyPlayed: boolean;
    playlistData: HomePlaylistItemTypes;
    playlistQueue: NewReleaseSongTypes[];
    albumData: AlbumTypes;
};

const initialState: MusicStateTypes = {
    isPremium: false,
    homeData: [],
    showBottomPlayer: false,
    playerData: {} as NewReleaseSongTypes,
    showQueue: false,
    showPlaylist: true,
    showRecentlyPlayed: false,
    playlistData: {} as HomePlaylistItemTypes,
    playlistQueue: [],
    albumData: {} as AlbumTypes,
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
        setPlaylistData: (
            state,
            action: PayloadAction<HomePlaylistItemTypes>
        ) => {
            state.playlistData = action.payload;
        },
        setPlaylistQueue: (
            state,
            action: PayloadAction<NewReleaseSongTypes[]>
        ) => {
            state.playlistQueue = action.payload;
        },
        setAlbumData: (state, action: PayloadAction<AlbumTypes>) => {
            state.albumData = action.payload;
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
    setPlaylistData,
    setPlaylistQueue,
    setAlbumData,
} = musicSlice.actions;
export default musicSlice.reducer;

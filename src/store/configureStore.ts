import { configureStore, combineReducers } from "@reduxjs/toolkit";
import playerSlice from "./actions/playerSlice";
import searchSlice from "./actions/searchSlice";
import musicSlice from "./actions/musicSlice";

const reducer = combineReducers({
    player: playerSlice,
    search: searchSlice,
    music: musicSlice,
});

const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

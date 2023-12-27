import { configureStore, combineReducers } from "@reduxjs/toolkit";
import playerSlice from "./actions/playerSlice";
import searchSlice from "./actions/searchSlice";

const reducer = combineReducers({
    player: playerSlice,
    search: searchSlice,
});

const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

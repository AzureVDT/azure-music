import { configureStore, combineReducers } from "@reduxjs/toolkit";
import playerSlice from "./actions/playerSlice";

const reducer = combineReducers({
    player: playerSlice,
});

const store = configureStore({
    reducer,
});

export default store;

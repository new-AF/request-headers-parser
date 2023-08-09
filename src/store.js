import * as toolkitRaw from "@reduxjs/toolkit";
const { configureStore } = toolkitRaw.default ?? toolkitRaw;

// import timeReducer from "./timeSlice.js";

const store = configureStore({
    reducer: {},
});

export default store;

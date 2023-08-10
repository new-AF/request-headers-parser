import * as toolkitRaw from "@reduxjs/toolkit";
const { configureStore } = toolkitRaw.default ?? toolkitRaw;

import reducer from "./headersSlice.js";

const store = configureStore({
    reducer: {
        headers: reducer,
    },
});

export default store;

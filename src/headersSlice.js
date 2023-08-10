/* workaround for node.js error
import { createSlice } from "@reduxjs/toolkit";
         ^^^^^^^^^^^
SyntaxError: Named export 'createSlice' not found. The requested module '@reduxjs/toolkit' is a CommonJ
S module, which may not support all module.exports as named exports.
*/
import * as toolkitRaw from "@reduxjs/toolkit";
const { createSlice, createAsyncThunk } = toolkitRaw.default ?? toolkitRaw;

/* joins server URL and PORT with e.g. /api/whoami */
export function joinURL(...add) {
    /* remove leading and trailing "/" */
    const array = add.map((str) =>
        str.replace(/^\/+/g, "").replace(/\/+$/g, "")
    );
    const str = array.join("/");
    /*  server URL and PORT */
    const res = `${import.meta.env.VITE_MY_SERVER_URL_WITH_PORT}/${str}`;

    return res;
}

const apiURL = "/api/whoami";
const initialState = {
    input: apiURL,
    json: JSON.stringify("-"),
};

const callServer = createAsyncThunk("headers/callServer", async () => {
    const url = joinURL(apiURL);
    console.log("--- calling", url);
    const res = await fetch(url);
    const json = res.json();
    return json;
});

const slice = createSlice({
    name: "headers",
    initialState,
    reducers: {},
    /* setJSON */
    extraReducers: (builder) => {
        builder.addCase(callServer.fulfilled, (state, action) => {
            const JSONObject = action.payload;
            // console.log("--- response", JSONObject, typeof JSONObject);
            state.json = JSON.stringify(JSONObject);
        });
    },
});

// export const { setRequestAndJSON, setInput } = slice.actions;
export { callServer };
export default slice.reducer;

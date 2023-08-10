/* workaround for node.js error
import { createSlice } from "@reduxjs/toolkit";
         ^^^^^^^^^^^
SyntaxError: Named export 'createSlice' not found. The requested module '@reduxjs/toolkit' is a CommonJ
S module, which may not support all module.exports as named exports.
*/
import * as toolkitRaw from "@reduxjs/toolkit";
const { createSlice, createAsyncThunk } = toolkitRaw.default ?? toolkitRaw;

/* join server URL (and Optional PORT) with e.g. http//:localhost:3000/api/whoami */
export function joinURL(...add) {
    const removeLeading = /^\/+/g;
    const removeTrailing = /\/+$/g;

    /*  server URL (and Optional PORT) */
    const serverOriginal = import.meta.env.VITE_MY_SERVER_URL_WITH_PORT;

    /* remove Server trailing "/" */
    const server = serverOriginal.replace(removeTrailing, "");

    /* remove User leading and trailing "/" */
    const array = add.map((str) =>
        str.replace(removeLeading, "").replace(removeTrailing, "")
    );
    const user = array.join("/");

    const url = `${server}/${user}`;

    return url;
}

const apiURL = "/api/whoami";
const url = joinURL(apiURL);
const initialState = {
    input: url,
    json: JSON.stringify(""),
};

const callServer = createAsyncThunk("headers/callServer", async () => {
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

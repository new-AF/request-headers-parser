import express from "express";
import cors from "cors";

/* workaround for no __dirname in when ES modules*/
/* for { fileURLToPath } */
import url from "url";
/* for { dirname, join } */
import path from "path";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 3000;

const app = express();

/* "dist" React built app dir path */
const distPath = path.join(__dirname, "..", "..", "dist");

/* get full path */
function fullPathFromDist(str) {
    return path.join(distPath, str);
}

/* allow calls from anywhere? */
/* CC BY-SA 4.0 code by "Yashwardhan Pauranik" on https://stackoverflow.com/a/46988108 */
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration

/* make "dist" full path accessible */
app.use(express.static(distPath));

/* load the built index.html */
app.get("/", function (req, res) {
    res.sendFile(fullPathFromDist("index.html"));
});

/* pass tests */
app.get("/api/whoami", function (req, res) {
    const { ip, headers } = req;
    const ua = headers["user-agent"];
    const langs = headers["accept-language"];
    /* send this */
    const json = {
        ipaddress: ip,
        language: langs,
        software: ua,
    };
    res.json(json);
});

app.listen(port, () => console.log(`--- server is listening on ${port}`));

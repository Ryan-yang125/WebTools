const fs = require("fs");
const path = require("path");
const writeName = "lines.json";
const patterns = [
    "c",
    "cpp",
    "cc",
    "h",
    "cs",
    "hpp",
    "vert",
    "frag",
    "glsl",
    "js",
    "ts",
    "html",
    "css",
];

(() => {
    const lineCount = text => text.split("\n").length;

    const isMatch = fileName =>
        patterns.find(pattern => pattern === fileName.split(".").pop());

    const isSubFolder = dirpath => fs.lstatSync(dirpath).isDirectory();

    const result = {};
    let totalN = 0;

    const dfs = (sub,depth, depthNow=0) => {

        if (depthNow > depth) {
            return;
        }

        const filePath = path.join(__dirname, sub);

        if (!fs.existsSync(filePath)) {
            return;
        }

        if (isSubFolder(filePath)) {
            fs.readdirSync(filePath).forEach(file => dfs(path.join(sub, file), depth, depthNow+1));
        } else {
            if (isMatch(sub)) {
                const data = fs.readFileSync(filePath, "utf8");
                const lineN = lineCount(data);
                result[sub] = lineN;
                totalN += lineN;
                console.log(`${sub}:`, lineN);
            }
        }
    };

    dfs("", Infinity);

    result.total = totalN;
    console.log("Total:", totalN);

    fs.writeFileSync(
        path.join(__dirname, writeName),
        JSON.stringify(result, null, 4)
    );
    console.log("Data:", path.join(__dirname, writeName));
})();

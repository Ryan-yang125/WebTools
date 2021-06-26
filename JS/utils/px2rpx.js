const fs = require("fs");
const path = require("path");
const folder = "/Users/apple/MiniProjects/serverless/client/pages/";
const pxTorpx = sub => {
    const rate = 750 / 414;
    const toInt = x => ~~x;
    const isAcss = str => str.split(".")[1] === "acss";
    const reg = /([0-9]+)px/g;
    const pathToSub = path.join(folder, sub);
    fs.readdirSync(pathToSub).forEach(file => {
        if (isAcss(file)) {
            const filePath = path.join(pathToSub, file);
            const data = fs.readFileSync(filePath, "utf8");
            const repData = data.replace(
                reg,
                (...args) => `${toInt(rate * args[1])}rpx`
            );
            fs.writeFileSync(filePath, repData);
            console.log(`${filePath} OK!`);
        }
    });
};

fs.readdirSync(folder).forEach(sub => {
    if (sub.indexOf(".") === -1) pxTorpx(sub);
});

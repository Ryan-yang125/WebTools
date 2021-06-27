const fs = require("fs");
const path = require("path");
const patterns = ['mov'];
const { exec } = require("child_process");
(() => {

    const speedup = (fileName) => {
        exec(
            `ffmpeg -itsscale 0.06666 -i ${fileName} -c copy ./output/${fileName.split(".")[0]}.mp4`,
            (err, stdout, stderr) => {
              if (err) {
                console.log(err);
              }
              console.log(`stdout:${stdout}`);
            }
          );
    }
    const isMatch = fileName =>
        patterns.find(pattern => pattern === fileName.split(".").pop());

    const isSubFolder = dirpath => fs.lstatSync(dirpath).isDirectory();

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
                speedup(sub);
            }
        }
    };

    dfs("",1);
})();
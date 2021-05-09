const fs = require("fs");
const path = require("path");

const getOutputStream = (output) => {
  const outputPath =
    output && path.isAbsolute(output)
      ? output
      : path.normalize(path.join(`${__dirname}/${output}`));

  return new Promise((res, rej) => {
    if (output) {
      fs.access(outputPath, fs.constants.W_OK, (err) => {
        if (err) {
          process.stderr.write(
            `You can't write this output file: ${outputPath} or this file isn't exist`
          );
          process.exit(1);
          rej(err);
        }
        res(fs.createWriteStream(outputPath, { flags: "a" }));
      });
    } else res(process.stdout);
  });
};

module.exports = {
  getOutputStream,
};

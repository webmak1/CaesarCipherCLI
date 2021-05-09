const fs = require("fs");
const path = require("path");

const getReadStream = (input) => {
  const inputPath =
    input && path.isAbsolute(input)
      ? input
      : path.normalize(path.join(`${__dirname}/${input}`));

  return new Promise((res, rej) => {
    if (input) {
      fs.access(inputPath, fs.constants.R_OK, (err) => {
        if (err) {
          process.stderr.write(
            `You can't read this input file: ${inputPath} or this file isn't exist`
          );
          process.exit(1);
          rej(err);
        }
        res(fs.createReadStream(inputPath));
      });
    } else res(process.stdin);
  });
};

module.exports = {
  getReadStream,
};

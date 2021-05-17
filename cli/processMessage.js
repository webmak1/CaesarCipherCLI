const { pipeline } = require("stream");

const { validateUserData } = require("./validateUserData");
const { getReadStream } = require("./readStream");
const { getTransformStream } = require("./transformStream");
const { getOutputStream } = require("./writeStream");

const handleErrorStream = (err) => process.exit(1);

const processMessage = (options) => {
  const {
    isValidate,
    data: { input, output, shift, action },
  } = validateUserData(options);

  if (isValidate) {
    Promise.all([getReadStream(input), getOutputStream(output)])
      .then((streamObjects) => {
        const [readStream, writeStream] = streamObjects;
        pipeline(
          readStream,
          getTransformStream(shift, action),
          writeStream,
          handleErrorStream
        );
      })
      .catch(handleErrorStream);
  }
};

module.exports = {
  processMessage,
};

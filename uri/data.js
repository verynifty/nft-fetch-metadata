exports.createDataURI = function (mime, data) {
  const dataBuffer = Buffer.from(data, "utf-8");
  return `data:${mime};base64,${dataBuffer.toString("base64")}`;
};

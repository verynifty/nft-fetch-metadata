const { ARWEAVE_DEFAULT } = require("../constants/providers.js");

const isValidHttpUrl = (uri) => {
  try {
    let url = new URL(uri);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
};

exports.isArweave = function (uri) {
  const hasPrefix = uri.startsWith("ar://");
  return uri.startsWith("https://arweave.net/") || hasPrefix;
};

exports.hasArPrefix = function (uri) {
  return uri.startsWith("ar://");
};

exports.getARWeaveURI = function (uri) {
  if (module.exports.hasArPrefix(uri)) {
    return uri.replace("ar://", ARWEAVE_DEFAULT);
  }

  if (isValidHttpUrl(uri)) {
    return uri;
  }
  throw new Error("Cannot parse ARWeave URI");
};

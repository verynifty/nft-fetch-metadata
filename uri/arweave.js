const { ARWEAVE_DEFAULT } = require("../constants/providers.js");

exports.isArweave = (uri) => {
  const hasPrefix = uri.startsWith("ar://");
  return uri.startsWith("https://arweave.net/") || hasPrefix;
};

exports.hasArPrefix = (uri) => {
  return uri.startsWith("ar://");
};

exports.getARWeaveURI = (uri) => {
  if (hasArPrefix(uri)) {
    return uri.replace("ar://", ARWEAVE_DEFAULT);
  }

  //   to do
  //   if (isValidHttpUrl(uri)) {
  //     return uri;
  //   }
  throw new Error("Cannot parse ARWeave URI");
};

const { isIPFS, convertToGateway } = require("./ipfs.js");
const { isArweave, hasArPrefix, getARWeaveURI } = require("./arweave.js");

const { getStaticURI } = require("./static.js");

module.exports = {
  isIPFS,
  convertToGateway,
  isArweave,
  hasArPrefix,
  getARWeaveURI,
  getStaticURI,
};

const { isIPFS, convertToGateway } = require("./ipfs.js");
const { isArweave, hasArPrefix, getARWeaveURI } = require("./arweave.js");

module.exports = {
  isIPFS,
  convertToGateway,
  isArweave,
  hasArPrefix,
  getARWeaveURI,
};

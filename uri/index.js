const { isIPFS, convertToGateway } = require("./ipfs.js");
const { isArweave, hasArPrefix, getARWeaveURI } = require("./arweave.js");

const { getStaticURI } = require("./static.js");

const { getAlternateContractCall } = require("./contract");

module.exports = {
  isIPFS,
  convertToGateway,
  isArweave,
  hasArPrefix,
  getARWeaveURI,
  getStaticURI,
  getAlternateContractCall,
};

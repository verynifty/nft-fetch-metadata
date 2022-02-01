const { isIPFS, convertToGateway } = require("./ipfs.js");
const { isArweave, hasArPrefix, getARWeaveURI } = require("./arweave.js");

const { getStaticURI } = require("./static.js");

const { getAlternateContractCall } = require("./contract");

const {
  fetchMimeType,
  fetchURI,
  fetchWithRetriesAndTimeout,
  fetchWithTimeout,
  parseDataUri,
} = require("./fetch");

module.exports = {
  isIPFS,
  convertToGateway,
  isArweave,
  hasArPrefix,
  getARWeaveURI,
  getStaticURI,
  getAlternateContractCall,
  fetchMimeType,
  fetchURI,
  fetchWithRetriesAndTimeout,
  fetchWithTimeout,
  parseDataUri,
};

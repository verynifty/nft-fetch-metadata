const {
  isIPFS,
  hasIpfsPrefix,
  getIPFSUrl,
  getPrivateGateway,
} = require("./ipfs.js");
const { isArweave, hasArPrefix, getARWeaveURI } = require("./arweave.js");

const { getStaticURI, getURIData } = require("./static.js");

const { getAlternateContractCall } = require("./contract");

const {
  fetchMimeType,
  fetchURI,
  fetchWithRetriesAndTimeout,
  fetchWithTimeout,
  parseDataUri,
} = require("./fetch");

const { createDataURI } = require("./data.js");

const { getViaAlchemy } = require("./alchemy.js");

module.exports = {
  // convertToGateway,
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
  isIPFS,
  hasIpfsPrefix,
  getIPFSUrl,
  getPrivateGateway,
  createDataURI,
  getViaAlchemy,
  getURIData,
};

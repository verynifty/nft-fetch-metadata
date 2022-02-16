// // parse if ipfs urls

// exports.isIPFS = (uri) => {
//   const result = gatewayTools.containsCID(uri);

//   return result.containsCid;
// };

// exports.convertToGateway = (sourceUrl, desiredGatewayPrefix) => {
//   return gatewayTools.convertToDesiredGateway(sourceUrl, desiredGatewayPrefix);
// };

const { isAddressMatch } = require("../utils/addresses");
const {
  FOUNDATION_TOKEN_ADDRESS,
  MAKERSPLACE_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} = require("../constants/addresses");

const IPFSGatewayTools = require("@pinata/ipfs-gateway-tools/dist/node");
const gatewayTools = new IPFSGatewayTools();

exports.hasIpfsPrefix = (uri) => {
  return uri.startsWith("ipfs://");
};

exports.getIPFSUrl = (uri, gateway) => {
  if (module.exports.isIPFS(uri) || !uri.includes("pinata")) {
    //added case for pinata
    return gatewayTools.convertToDesiredGateway(uri, gateway);
  }

  return uri;
};

exports.isIPFS = function (uri) {
  const result = gatewayTools.containsCID(uri);

  // TODO - this lib is not working right so hack for now
  return (
    result.containsCid &&
    (uri.includes("/ipfs/") || module.exports.hasIpfsPrefix(uri))
  );
};

exports.getPrivateGateway = (chainName, tokenAddress) => {
  if (isAddressMatch(chainName, tokenAddress, MAKERSPLACE_TOKEN_ADDRESS)) {
    return "https://ipfsgateway.makersplace.com";
  }
  if (isAddressMatch(chainName, tokenAddress, FOUNDATION_TOKEN_ADDRESS)) {
    return "https://ipfs.foundation.app";
  }
  // if (isAddressMatch(chainName, tokenAddress, ZORA_TOKEN_ADDRESS)) {
  //   return "https://zora-prod.mypinata.cloud";
  // }
  return;
};

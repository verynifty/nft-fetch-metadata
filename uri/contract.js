const { Contract } = require("ethers");

const { isAddressMatch } = require("../utils/addresses");
const { ERC721_TOKEN_TYPE } = require("../constants/token-types");

// this is for custom contract support
exports.getAlternateContractCall = (
  networkName,
  tokenAddress,
  tokenId,
  provider
) => {
  const RANDOM_TOKEN = 0x0;
  if (isAddressMatch(networkName, tokenAddress, RANDOM_TOKEN)) {
    return {
      type: ERC721_TOKEN_TYPE,
      //   example,
      //   uri: await Contract.cnnect.randomFunction(token.address, tokenId),
    };
  }
  return;
};

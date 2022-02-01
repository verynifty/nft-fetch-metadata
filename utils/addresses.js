const { getAddress } = require("@ethersproject/address");
const { ethers, utils } = require("ethers");

exports.isAddressMatch = (chainName, address, addressByNetwork) => {
  if (!addressByNetwork[chainName]) {
    return false;
  }
  return getAddress(address) === getAddress(addressByNetwork[chainName]);
};

exports.normalizeTokenID1155 = (tokenId) => {
  return utils
    .hexlify(
      utils.zeroPad(
        utils.arrayify(ethers.BigNumber.from(tokenId).toHexString()),
        64
      )
    )
    .substr(4);
};

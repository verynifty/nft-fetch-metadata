const { getAddress } = require("@ethersproject/address");
const { BigNumber, ethers, utils } = require("ethers");

exports.isAddressMatch = (chainName, address, addressByNetwork) => {
  if (!addressByNetwork[chainName]) {
    return false;
  }
  return getAddress(address) === getAddress(addressByNetwork[chainName]);
};

exports.normalizeTokenID1155 = function (tokenId) {
  return utils
    .hexZeroPad(utils.arrayify(BigNumber.from(tokenId)), 32)
    .replace("0x", "");
};

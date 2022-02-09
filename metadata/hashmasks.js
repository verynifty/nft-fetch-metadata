const { Contract } = require("@ethersproject/contracts");
const { JsonRpcProvider } = require("@ethersproject/providers");

exports.fetchHashmaskMeta = async function (tokenAddress, tokenId, provider) {
  const HMContract = new Contract(
    tokenAddress,
    [
      "function tokenNameByIndex(uint256 index) public view returns (string memory)",
    ],
    provider
  );
  const name = await HMContract.tokenNameByIndex(tokenId);
  return {
    name,
  };
};

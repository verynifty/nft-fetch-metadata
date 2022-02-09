const { JsonRpcProvider } = require("@ethersproject/providers");
const { MediaFactory } = require("@zoralabs/core/dist/typechain");

exports.fetchZoraMeta = function (tokenAddress, tokenId, provider) {
  const contentURL = await MediaFactory.connect(
    tokenAddress,
    provider
  ).tokenURI(tokenId);
  return {
    contentURL,
  };
};

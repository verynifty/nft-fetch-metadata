const { JsonRpcProvider } = require("@ethersproject/providers");

const {
  AUTOGLYPHS_TOKEN_ADDRESS,
  HASHMASKS_TOKEN_ADDRESS,
  LOOT_TOKEN_ADDRESS,
  WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
} = require("../constants/addresses");
const { isAddressMatch } = require("../utils/addresses");
const { fetchZoraMeta } = require("./zora");
const { fetchHashmaskMeta } = require("./hashmasks");
const { fetchLootMeta } = require("./loot");
// const { fetchPunkAttributes } = require("./punks");
const { fetchAutoglyphsMeta } = require("./autoglyphs");

exports.fetchOnChainData = (networkName, tokenAddress, tokenId, provider) => {
  if (isAddressMatch(networkName, tokenAddress, AUTOGLYPHS_TOKEN_ADDRESS)) {
    return fetchAutoglyphsMeta(tokenAddress, tokenId, provider);
  }
  if (isAddressMatch(networkName, tokenAddress, HASHMASKS_TOKEN_ADDRESS)) {
    return fetchHashmaskMeta(tokenAddress, tokenId, provider);
  }
  if (
    isAddressMatch(networkName, tokenAddress, WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS)
  ) {
    // return fetchPunkAttributes(tokenAddress, tokenId, provider);
  }
  if (isAddressMatch(networkName, tokenAddress, ZORA_TOKEN_ADDRESS)) {
    return fetchZoraMeta(tokenAddress, tokenId, provider);
  }
  if (isAddressMatch(networkName, tokenAddress, LOOT_TOKEN_ADDRESS)) {
    return fetchLootMeta(tokenAddress, tokenId, provider);
  }
  return Promise.resolve({});
};

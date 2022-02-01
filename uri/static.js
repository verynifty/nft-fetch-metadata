const { isAddressMatch } = require("../utils/addresses");
const { ENS_TOKEN_ADDRESS } = require("../constants/addresses");
const { ERC721_TOKEN_TYPE } = require("../constants/token-types");

exports.getStaticURI = (chainName, tokenAddress, tokenId) => {
  if (isAddressMatch(chainName, tokenAddress, ENS_TOKEN_ADDRESS)) {
    let ensChainName = chainName;
    if (ensChainName == "homestead") {
      ensChainName = "mainnet";
    }
    return {
      type: ERC721_TOKEN_TYPE,
      uri: `https://metadata.ens.domains/${ensChainName}/${tokenAddress.toLowerCase()}/${tokenId}/`,
    };
  }

  return;
};

// export function getURIData(
//   chainName: string,
//   tokenAddress: string,
//   tokenId: string
// ) {
//   if (
//     isAddressMatch(chainName, tokenAddress, WRAPPED_CRYPTOPUNKS_TOKEN_ADDRESS)
//   ) {
//     return Promise.resolve({
//       title: `W#${tokenId}`,
//       name: `W#${tokenId}`,
//       description:
//         "This Punk was wrapped using Wrapped Punks contract, accessible from https://wrappedpunks.com",
//       external_url: `https://larvalabs.com/cryptopunks/details/${tokenId}`,
//     });
//   }
//   if (isAddressMatch(chainName, tokenAddress, AUTOGLYPHS_TOKEN_ADDRESS)) {
//     return Promise.resolve({
//       title: `Autoglyph #${tokenId}`,
//       name: `Autoglyph #${tokenId}`,
//       image: `https://www.larvalabs.com/autoglyphs/glyphimage?index=${tokenId}`,
//       description:
//         "Autoglyphs are the first “on-chain” generative art on the Ethereum blockchain. A completely self-contained mechanism for the creation and ownership of an artwork.",
//       external_url: `https://www.larvalabs.com/autoglyphs/glyph?index=${tokenId}`,
//     });
//   }
//   return;
// }

const {
  JsonRpcProvider,
  StaticJsonRpcProvider,
} = require("@ethersproject/providers");

const { Contract } = require("ethers");

function fetchTokenURI(tokenAddress, tokenId) {
  const staticURI = getStaticURI(
    this.provider.network.name,
    tokenAddress,
    tokenId
  );
  if (staticURI) {
    return staticURI;
  }
  const alternateMethod = await getAlternateContractCall(
    this.provider.network.name,
    tokenAddress,
    tokenId,
    this.provider
  );
  if (alternateMethod) {
    return alternateMethod;
  }

  try {
    const erc721Contract = Erc721Factory.connect(tokenAddress, this.provider);
    const uri = await erc721Contract.tokenURI(tokenId);
    return {
      uri,
      type: ERC721_TOKEN_TYPE,
    };
  } catch (e) {
    // if this fails, attempt 1155 fetch
  }
  try {
    const erc1155Contract = new Contract(
      tokenAddress,
      ["function uri(uint256 index) public view returns (string memory)"],
      this.provider
    );
    let uri = await erc1155Contract.uri(tokenId);
    if (uri.includes("{id}")) {
      uri = uri.replace("{id}", normalizeTokenID1155(tokenId));
    }
    return { uri, type: ERC1155_TOKEN_TYPE };
  } catch (e) {
    // if this fails, fail function
  }
  throw new ChainFetchError("Cannot fetch uri from contract");
}

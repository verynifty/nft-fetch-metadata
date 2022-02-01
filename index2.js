const {
  JsonRpcProvider,
  StaticJsonRpcProvider,
} = require("@ethersproject/providers");

const {
  CLOUDFLARE_RPC_DEFAULT,
  IPFS_IO_GATEWAY,
  IPFS_CLOUDFLARE_GATEWAY,
} = require("./constants/providers");

const { getStaticURI, getAlternateContractCall } = require("./uri");

const { Contract } = require("ethers");

function Fetcher(
  timeout,
  ipfsGatewayUrl,
  ipfsFallbackGatewayUrl,
  provider,
  network
) {
  this.network = network || "mainnet";

  this.ipfsGatewayUrl = ipfsGatewayUrl || IPFS_IO_GATEWAY;
  this.ipfsFallbackGatewayUrl =
    ipfsFallbackGatewayUrl || IPFS_CLOUDFLARE_GATEWAY;
  this.timeout = timeout || 40000;

  this.provider = new StaticJsonRpcProvider(
    this.networkUrl || CLOUDFLARE_RPC_DEFAULT,
    this.network
  );
}

Fetcher.prototype.fetchTokenURI = async function (tokenAddress, tokenId) {
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
  throw new Error("Cannot fetch uri from contract");
};

module.exports = Fetcher;

const {
  JsonRpcProvider,
  StaticJsonRpcProvider,
} = require("@ethersproject/providers");

const { getAddress } = require("@ethersproject/address");

const {
  CLOUDFLARE_RPC_DEFAULT,
  IPFS_IO_GATEWAY,
  IPFS_CLOUDFLARE_GATEWAY,
} = require("./constants/providers");

const {
  ERC721_TOKEN_TYPE,
  ERC1155_TOKEN_TYPE,
} = require("./constants/token-types");

const { fetchOnChainData, normaliseURIData } = require("./metadata");

const {
  getStaticURI,
  getAlternateContractCall,
  getIPFSUrl,
  getPrivateGateway,
  createDataURI,
  getURIData,
  fetchMimeType,
  fetchURI,
} = require("./uri");

const { Contract } = require("ethers");

const ERC721ABI = require("./abis/erc721.json");

function Fetcher(
  timeout,
  ipfsGatewayUrl,
  ipfsFallbackGatewayUrl,
  provider,
  networkUrl,
  network
) {
  this.network = network || "mainnet";

  this.ipfsGatewayUrl = ipfsGatewayUrl || IPFS_IO_GATEWAY;
  this.ipfsFallbackGatewayUrl =
    ipfsFallbackGatewayUrl || IPFS_CLOUDFLARE_GATEWAY;
  this.timeout = timeout || 40000;

  this.provider = new StaticJsonRpcProvider(
    networkUrl || CLOUDFLARE_RPC_DEFAULT,
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
    const contract = new Contract(tokenAddress, ERC721ABI, this.provider);

    const symbol = await contract.symbol();

    const uri = await contract.tokenURI(tokenId);

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
    // console.log(e);
    // if this fails, fail function
  }
  throw new Error("Cannot fetch uri from contract");
};

Fetcher.prototype.fetchURIData = async function (
  tokenAddress,
  tokenId,
  tokenURI,
  ipfsGateway,
  callOptions = { timeout: this.timeout }
) {
  const alternateMethod = getURIData(
    this.provider.network.name,
    tokenAddress,
    tokenId
  );
  if (alternateMethod) {
    return alternateMethod;
  }
  const resp = await fetchURI(
    tokenURI,
    callOptions,
    ipfsGateway,
    this.ipfsFallbackGatewayUrl
  );
  if (!resp) {
    throw new Error(`Failed to fetch uri data for token from: ${tokenURI}`);
  }
  return resp;
};

Fetcher.prototype.parseURIData = async function (
  tokenAddress,
  tokenId,
  tokenURI,
  uriData,
  ipfsGateway
) {
  const onChainData = await fetchOnChainData(
    this.provider.network.name,
    tokenAddress,
    tokenId,
    this.provider
  );
  const meta = normaliseURIData(this.provider.network.name, tokenAddress, {
    ...uriData,
    ...onChainData,
    ...(uriData?.mimeType && {
      contentURLMimeType: uriData.mimeType,
    }),
  });

  if (meta.image) {
    meta.imageURL = getIPFSUrl(meta.image, ipfsGateway);
  }

  if (meta.image_data) {
    meta.imageURL = createDataURI(SVG_IMAGE_MIME_TYPE, meta.image_data);
    meta.imageURLMimeType = SVG_IMAGE_MIME_TYPE;
  }

  if (meta.animation_url) {
    meta.contentURL = getIPFSUrl(meta.animation_url, ipfsGateway);
  }

  if (!meta.contentURL && meta.imageURL) {
    meta.contentURL = meta.imageURL;
  }

  if (meta.contentURL && !meta.contentURLMimeType) {
    meta.contentURLMimeType = await fetchMimeType(meta.contentURL, {
      timeout: this.timeout,
    });
  }

  if (meta.imageURL && !meta.imageURLMimeType) {
    meta.imageURLMimeType = await fetchMimeType(meta.imageURL, {
      timeout: this.timeout,
    });
  }

  const {
    name,
    description,
    attributes,
    external_url: externalURL,
    imageURL,
    imageURLMimeType,
    contentURL,
    contentURLMimeType,
  } = meta;

  return {
    tokenURL: getIPFSUrl(tokenURI, ipfsGateway),
    tokenURLMimeType: "application/json",
    ...(name && { name }),
    ...(description && { description }),
    ...(imageURL && { imageURL }),
    ...(imageURLMimeType && { imageURLMimeType }),
    ...(contentURL && { contentURL }),
    ...(contentURLMimeType && { contentURLMimeType }),
    ...(attributes && { attributes }),
    ...(externalURL && { externalURL }),
  };
};

Fetcher.prototype.fetchMetadata = async function (rawAddress, tokenId) {
  const tokenAddress = getAddress(rawAddress);
  try {
    const uriFetchResult = await this.fetchTokenURI(tokenAddress, tokenId);
    const { uri: tokenURI, type: tokenType } = uriFetchResult;

    const ipfsGateway =
      getPrivateGateway(this.provider.network.name, tokenAddress) ||
      this.ipfsGatewayUrl;

    const URIData = await this.fetchURIData(
      tokenAddress,
      tokenId,
      tokenURI,
      ipfsGateway
    );
    // console.log('fetched uri data: ', { URIData })

    const metadata = await this.parseURIData(
      tokenAddress,
      tokenId,
      tokenURI,
      URIData,
      ipfsGateway
    );
    // console.log('parsed metadata: ', { metadata })

    return {
      tokenId,
      tokenAddress,
      metadata: URIData,
      tokenURI,
      tokenType,
      ...metadata,
    };
  } catch (err) {
    if (err) {
      console.error(err);
      throw new Error(
        `Failed to get tokenURI token: ${tokenAddress} is unsupported by @zoralabs/nft-metadata`
      );
    }
    throw err;
  }
  // console.log('fetched uri: ', { tokenURI, tokenType })
};

Fetcher.prototype.fetchURI = async function (uri, callOptions) {
  const ipfsGateway = this.ipfsGatewayUrl;

  let options = callOptions || {};
  options.timeout = this.timeout;

  const resp = await fetchURI(
    uri,
    options,
    ipfsGateway,
    this.ipfsFallbackGatewayUrl
  );
  if (!resp) {
    throw new Error(`Failed to fetch uri data for token from: ${uri}`);
  }
  return resp;
};

Fetcher.prototype.fetchMimeType = async function (url) {
  const mimeType = await fetchMimeType(url, {
    timeout: this.timeout,
  });
  return mimeType;
};

module.exports = Fetcher;

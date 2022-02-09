require("dotenv").config();

const axios = require("axios");

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const apiKey = process.env.ALCHEMY;

// Initialize an alchemy-web3 instance:
const web3 = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`
);

// const baseURL = `https://eth-mainnet.g.alchemy.com/v2/${apiKey}/getNFTs/`;

// Replace with the wallet address you want to query for NFTs:
// const ownerAddr = "0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c";

exports.getViaAlchemy = async function (address, tokenId) {
  //   const res = await axios(`${baseURL}?owner=${ownerAddr}`);

  const response = await web3.alchemy.getNftMetadata({
    contractAddress: address,
    tokenId: tokenId,
  });

  return response;
};

// Make the request and print the formatted response:

require("dotenv").config();

const axios = require("axios");

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const apiKey = process.env.ALCHEMY;

const web3 = createAlchemyWeb3(
  `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`
);

exports.getViaAlchemy = async function (address, tokenId) {
  //   const res = await axios(`${baseURL}?owner=${ownerAddr}`);

  const response = await web3.alchemy.getNftMetadata({
    contractAddress: address,
    tokenId: tokenId,
  });

  return response;
};

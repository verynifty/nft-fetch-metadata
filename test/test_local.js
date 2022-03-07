require("dotenv").config();

const Fetcher = require("../nft-fetch-metadata");


(async function () {
  let rpc = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY}`;
  rpc = process.env.ARBITRUM;

  let options = [, , , , rpc];

  const fetch = new Fetcher(...options);

  const nft = await fetch.fetchMetadata(
    "0x8794ffb49bc980b63b92347456bb55d01c45e309", //loot
    "106"
  );

  console.log(nft);


  process.exit();
})();

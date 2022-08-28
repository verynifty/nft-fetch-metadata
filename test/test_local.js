require("dotenv").config();

const Fetcher = require("../");

(async function () {
  let rpc = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY}`;
  rpc = process.env.ARBITRUM;

  let options = [, , , , rpc];

  const fetch = new Fetcher(...options);

  const nft = await fetch.fetchMetadata(
    "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", //loot
    "106"
  );

  console.log(nft);

  process.exit();
})();

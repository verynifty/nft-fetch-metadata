require("dotenv").config();

const Fetcher = require("../");


(async function () {
  let rpc = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY}`;
  rpc = process.env.ARBITRUM;

  let options = [, , , , rpc];

  const fetch = new Fetcher(...options);

  const nft = await fetch.fetchMetadata(
    "0xe3435edbf54b5126e817363900234adfee5b3cee", //loot
    "106"
  );

  console.log(nft);


  process.exit();
})();

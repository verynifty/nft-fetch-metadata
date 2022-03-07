require("dotenv").config();

const Fetcher = require("../");


(async function () {
  let rpc = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY}`;
  rpc = process.env.ARBITRUM;

  let options = [, , , , rpc];

  const fetch = new Fetcher(...options);

  const nft = await fetch.fetchMetadata(
    "0x63182453d97b692b51305e0ee14a6a29fbc91d2c", //loot
    "1954"
  );

  console.log(nft);


  process.exit();
})();

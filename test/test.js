require("dotenv").config();

const Fetcher = require("@musedao/nft-fetch-metadata");

const { isArweave } = require("../uri/index");

// test getStatic url

console.log(isArweave("https://google.com"));

// test getStatic url

(async function () {
  let rpc = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY}`;
  // rpc = process.env.ARBITRUM;

  const infuraIPFS = "https://ipfs.infura.io:5001/api/v0/cat?arg=";
  let options = [, , , , rpc];

  const fetch = new Fetcher(...options);

  // const tokenUri = await fetch.fetchTokenURI(
  //   "0xe4605d46fd0b3f8329d936a8b258d69276cba264",
  //   "54"
  // );

  // console.log(tokenUri);

  const projectId = process.env.PROJECT_ID;
  const projectSecret = process.env.PROJECT_SECRET;

  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  const nft = await fetch.fetchMetadata(
    "0x37078802B8f4d6cDD7e8dA89bFcf3853e43Fea98", //loot
    "1072"
    // {
    //   method: "post",
    //   auth: auth,
    //   // responseType: "arraybuffer",
    //   // responseEncoding: "binary",
    // }
  );

  console.log(nft);

  // const alchemy = await getViaAlchemy(
  //   "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
  //   "5448"
  // );
  // console.log("alchemy", alchemy);

  const mimeType = await fetch.fetchMimeType(
    "https://gateway.ipfs.io/ipfs/QmUY31snq9dhBb4u1Z3HvhW88aujQiVqfiF8n7bxqU1RQa"
  );

  console.log("mimetype", mimeType);

  process.exit();
})();

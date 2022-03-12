require("dotenv").config();

const Fetcher = require("../");

const { isArweave } = require("../uri/index");

// test getStatic url

console.log(isArweave("https://google.com"));

// test getStatic url

(async function () {
  let rpc = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY}`;
  // rpc = process.env.ARBITRUM;

  const infuraIPFS = "https://ipfs.infura.io:5001/api/v0/cat?arg=";
  let options = [, , infuraIPFS, , rpc];

  const fetch = new Fetcher(...options);

  // const tokenUri = await fetch.fetchTokenURI(
  //   "0xe4605d46fd0b3f8329d936a8b258d69276cba264",
  //   "54"
  // );

  // console.log(tokenUri);

  const projectId = process.env.IPFS_PROJECT_ID;
  const projectSecret = process.env.IPFS_PROJECT_SECRET;

  const auth =
    "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

  console.log(auth);
  const nft = await fetch.fetchMetadata(
    "0x6ff683ea4ba14aa2a0fa3ca927b7886dba827b65", //loot
    "3242",
    {
      method: "post",
      auth: auth,
      // responseType: "arraybuffer",
      // responseEncoding: "binary",
    }
  );

  console.log(nft);

  // // const alchemy = await getViaAlchemy(
  // //   "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
  // //   "5448"
  // // );
  // // console.log("alchemy", alchemy);

  // const mimeType = await fetch.fetchMimeType(
  //   "https://gateway.ipfs.io/ipfs/QmUY31snq9dhBb4u1Z3HvhW88aujQiVqfiF8n7bxqU1RQa"
  // );

  // console.log("mimetype", mimeType);

  process.exit();
})();

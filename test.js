require("dotenv").config();

const { isIPFS, getStaticURI, getViaAlchemy } = require("./uri");

const Fetcher = require("./index.js");

console.log(
  `is IPFS? ${isIPFS(
    "https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.dweb.link/wiki/"
  )} `
);

// test getStatic url

(async function () {
  const rpc = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY}`;

  let options = [, , , , rpc];

  const fetch = new Fetcher(...options);

  // for (var i = 0; i < 50; i++) {
  //   const nft = await fetch.fetchMetadata(
  //     "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
  //     i
  //   );

  //   console.log("token Id", i);
  //   console.log(nft.metadata.image);
  // }

  const nft = await fetch.fetchMetadata(
    // "0xff9c1b15b16263c61d017ee9f65c50e4ae0113d7", //loot
    "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d", //bored ape
    "903"
  );

  console.log(nft);

  // const tokenUri = await fetch.fetchTokenURI(
  //   "0xe4605d46fd0b3f8329d936a8b258d69276cba264",
  //   "54"
  // );

  // console.log(tokenUri);

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

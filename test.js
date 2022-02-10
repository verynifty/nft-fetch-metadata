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
    "0x4d15d2aaa891bfae0824f227f1ef1489cb4191ff",
    "84547960308257454260890166076020185931469001129385629631576986981640198392185"
  );

  console.log(nft);

  // const alchemy = await getViaAlchemy(
  //   "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
  //   "5448"
  // );
  // console.log("alchemy", alchemy);

  process.exit();
})();

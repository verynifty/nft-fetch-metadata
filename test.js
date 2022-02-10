const { isIPFS, getStaticURI, getViaAlchemy } = require("./uri");

const Fetcher = require("./index.js");

console.log(
  `is IPFS? ${isIPFS(
    "https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.dweb.link/wiki/"
  )} `
);

// test getStatic url

const fetch = new Fetcher();

(async function () {
  const uri = await fetch.fetchMetadata(
    "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    "32"
  );
  console.log(uri);
  // const alchemy = await getViaAlchemy(
  //   "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
  //   "5448"
  // );
  // console.log("alchemy", alchemy);
})();

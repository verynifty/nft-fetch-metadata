const { isIPFS, getStaticURI } = require("./uri");

const Fetcher = require("./index.js");

console.log(
  `is IPFS? ${isIPFS(
    "https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.dweb.link/wiki/"
  )} `
);

// test getStatic url

const fetch = new Fetcher();

(async function () {
  const uri = await fetch.fetchTokenURI(
    "0xe4605d46fd0b3f8329d936a8b258d69276cba264",
    "32"
  );

  console.log(uri);
})();

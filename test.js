const { isIPFS } = require("./uri/index.js");

console.log(
  `is IPFS? ${isIPFS(
    "https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.dweb.link/wiki/"
  )} `
);

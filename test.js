const { isIPFS, getStaticURI } = require("./uri");

console.log(
  `is IPFS? ${isIPFS(
    "https://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq.ipfs.dweb.link/wiki/"
  )} `
);

// test getStatic url
const staticURI = getStaticURI(
  "mainnet",
  "0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85",
  "11764840363253722354683532865519887665924940699905515008880686154051310419621"
);

console.log(staticURI);

# NFT Fetch Metadata

We forked Zora's metadata fetcher architechture + adding all the features and customizations we needed to be able to index all NFTs from any contract and fit our [NFT indexer](https://niftyapi.xyz).

Feel free to use it and contribute.

## Example

```javascript
require("dotenv").config();

const Fetcher = require("@musedao/nft-fetch-metadata");

let rpc = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY}`;
  
const infuraIPFS = "https://ipfs.infura.io:5001/api/v0/cat?arg="; //optional to pass ipfs node that works good, otherwise use a public one.


let options = [, , infuraIPFS, , rpc];

const fetch = new Fetcher(...options);

const tokenUri = await fetch.fetchTokenURI(
   "0xe4605d46fd0b3f8329d936a8b258d69276cba264",
    "54"
);

console.log(tokenUri);

const nft = await fetch.fetchMetadata(
    "0xa3518c1008698082057f3c0d49a67683265df6e5", //loot
    "51",
    {
      method: "post",
      auth: process.env.INFURA_IPFS,
      // responseType: "arraybuffer",
      // responseEncoding: "binary",
    }
);

console.log(nft);


```

The package has many more useful functions, examples are wip.
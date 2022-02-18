# NFT Fetch Metadata

We created a metadata fetcher from scratch for our [NFT indexer](https://niftyapi.xyz) but then found out about [Zora's NFT-Metadata package](https://github.com/ourzora/nft-metadata) architechture, they only support specific contracts and not all but their architechture was more upgradeable then ours.

We are using Zora's architechture + adding all the features and customizations we needed to be able to index all NFTs from any contract and fit our indexer needs.

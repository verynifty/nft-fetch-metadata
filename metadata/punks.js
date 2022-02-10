const { Contract } = require("@ethersproject/contracts");
const { JsonRpcProvider } = require("@ethersproject/providers");

// This properly encodes the svg data uri for punks
// from: spectrexyz/use-nft
function encodeUriData(dataUri) {
  const dataStart = dataUri.indexOf(",") + 1;
  return (
    dataUri.slice(0, dataStart) +
      encodeURIComponent(dataUri.slice(dataStart)) ?? ""
  );
}

// exports.fetchPunkAttributes = function (tokenAddress, tokenId, provider) {
//   const PunksDataContract = new Contract(
//     tokenAddress,
//     [
//       "function punkAttributes(uint16 index) public view returns (string memory)",
//       "function punkImageSvg(uint16 index) public view returns (string memory)",
//     ],
//     provider
//   );

//   const [type, ...accessories] = (
//     await PunksDataContract.punkAttributes(tokenId)
//   ).split(",");
//   const imageRaw = await PunksDataContract.punkImageSvg(tokenId);

//   return {
//     image: encodeUriData(imageRaw),
//     attributes: [
//       { trait_type: "Type", value: type },
//       ...accessories.map((accessory) => ({
//         trait_type: "Accessory",
//         value: accessory,
//       })),
//     ],
//   };
// };

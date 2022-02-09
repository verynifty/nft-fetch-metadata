const { JsonRpcProvider } = require("@ethersproject/providers");
const { Contract } = require("@ethersproject/contracts");

const abi = require("../abis/Loot.abi.json");

exports.fetchLootMeta = async function (tokenAddress, tokenId, provider) {
  const lootContract = new Contract(tokenAddress, abi, provider);
  const [chest, foot, hand, neck, ring, waist, weapon] = await Promise.all([
    lootContract.getChest(tokenId),
    lootContract.getFoot(tokenId),
    lootContract.getHand(tokenId),
    lootContract.getHead(tokenId),
    lootContract.getNeck(tokenId),
    lootContract.getRing(tokenId),
    lootContract.getWaist(tokenId),
    lootContract.getWeapon(tokenId),
  ]);
  return {
    attributes: [
      { trait_type: "Chest", value: chest },
      { trait_type: "Foot", value: foot },
      { trait_type: "Hand", value: hand },
      { trait_type: "Neck", value: neck },
      { trait_type: "Ring", value: ring },
      { trait_type: "Waist", value: waist },
      { trait_type: "Weapon", value: weapon },
    ],
  };
};

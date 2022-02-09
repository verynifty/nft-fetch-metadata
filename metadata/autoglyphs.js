const { Contract } = require("@ethersproject/contracts");
const { JsonRpcProvider } = require("@ethersproject/providers");

const SCHEME_MAP = {
  1: " X/\\",
  2: "+-|",
  3: "/\\",
  4: "|-/",
  5: "O|-",
  6: "\\",
  7: "#|-+",
  8: "OO",
  9: "#",
  10: "#O",
};

exports.fetchAutoglyphsMeta = async function (tokenAddress, tokenId, provider) {
  const GlyphsContract = new Contract(
    tokenAddress,
    ["function symbolScheme(uint256 index) public view returns (uint8)"],
    provider
  );
  const scheme = await GlyphsContract.symbolScheme(tokenId);
  return {
    properties: {
      // @ts-ignore
      "Symbol Scheme": SCHEME_MAP[scheme] || "Unknown",
    },
  };
};

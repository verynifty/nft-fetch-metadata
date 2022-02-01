// parse if ipfs urls

const IPFSGatewayTools = require("@pinata/ipfs-gateway-tools/dist/node");
const gatewayTools = new IPFSGatewayTools();

exports.isIPFS = (uri) => {
	const result = gatewayTools.containsCID(uri);

	return result.containsCid;
};

exports.convertToGateway = (sourceUrl, desiredGatewayPrefix) => {
	return gatewayTools.convertToDesiredGateway(sourceUrl, desiredGatewayPrefix);
};

// list of ipgsGateways to try
exports.ipfsGateways = [
	"https://ipfs.io",
	"https://cloudflare-ipfs.com",
	"https://ipfs.infura.io",
	"https://gateway.pinata.cloud",
	"https://ipfs.eth.aragon.network",
	"https://ipfs.fleek.co",
	"http://ipfs.anonymize.com",
	"https://crustwebsites.net",
];

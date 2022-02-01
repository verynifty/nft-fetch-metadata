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

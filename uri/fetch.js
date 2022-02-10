const axios = require("axios");
const axiosRetry = require("axios-retry");

const { getIPFSUrl, isIPFS } = require("./ipfs");

const { getViaAlchemy } = require("./alchemy.js"); //for alchemy if all else fails

const {
  IPFS_CLOUDFLARE_GATEWAY,
  IPFS_IO_GATEWAY,
} = require("../constants/providers");

const { getARWeaveURI, isArweave } = require("./arweave");

const isValidHttpUrl = (uri) => {
  try {
    let url = new URL(uri);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
};

exports.forceHttps = (source) => {
  return source.replace("http://", "https://");
};

exports.parseDataUri = (uri) => {
  const commaIndex = uri.indexOf(",");
  if (commaIndex === -1) {
    return undefined;
  }

  const mimeData = uri.substr(0, commaIndex + 1).match(/^data:([^;,]+)(.+)$/);

  if (!mimeData || !mimeData[1]) {
    return undefined;
  }
  const data = uri.substr(commaIndex + 1);
  let body = data;
  if (mimeData.length > 2 && mimeData[2]?.includes("base64")) {
    body = Buffer.from(data, "base64").toString("utf-8");
  } else if (body.includes("%")) {
    try {
      body = decodeURIComponent(body);
    } catch {
      // no-op
    }
  }
  return {
    body,
    mime: mimeData[1],
  };
};

exports.FetchOptions = axios.AxiosRequestConfig;

exports.fetchWithTimeout = (resource, options) => {
  const httpsUrl = forceHttps(resource);
  return axios.get(httpsUrl, {
    timeout: options.timeout,
  });
};

fetchWithRetriesAndTimeout = async (resource, options, maxRetries = 5) => {
  axiosRetry(axios, {
    retryDelay: axiosRetry.exponentialDelay,
    retries: maxRetries,
  });

  const method = options.method || "get";

  try {
    const response = await axios(resource, {
      timeout: options.timeout,
      method: method,
    });
    return response;
  } catch (err) {
    const errMsg = `Exhausted retries attempting to fetch ${resource} with error: ${err.message}`;
    throw new Error(errMsg);
  }
};

exports.fetchARWeaveWithTimeout = (uri, options) => {
  const tokenURL = getARWeaveURI(uri);
  return fetchWithRetriesAndTimeout(tokenURL, options);
};

exports.fetchIPFSWithTimeout = (uri, options, gateway) => {
  const tokenURL = getIPFSUrl(uri, gateway);
  return fetchWithRetriesAndTimeout(tokenURL, options);
};

async function multiAttemptIPFSFetch(
  uri,
  options,
  ipfsGateway,
  ipfsFallbackGatewayUrl
) {
  if (isValidHttpUrl(uri)) {
    try {
      const resp = await fetchWithRetriesAndTimeout(uri, options);
      return resp;
    } catch (e) {
      console.warn("Failed on https fetch");
    }
  }

  try {
    return await module.exports.fetchIPFSWithTimeout(
      uri,
      options,
      ipfsGateway || IPFS_IO_GATEWAY
    );
  } catch (e) {
    console.warn("Failed on initial fetch");
    if (ipfsGateway) {
      return await module.exports.fetchIPFSWithTimeout(
        uri,
        options,
        ipfsFallbackGatewayUrl || IPFS_CLOUDFLARE_GATEWAY
      );
    } else {
      throw e;
    }
  }
}

exports.fetchURI = async (
  uri,
  options,
  ipfsGateway,
  ipfsFallbackGatewayUrl
) => {
  if (isArweave(uri)) {
    const resp = await fetchARWeaveWithTimeout(uri, options);
    return resp?.data;
  }
  if (isIPFS(uri)) {
    const resp = await multiAttemptIPFSFetch(
      uri,
      options,
      ipfsGateway,
      ipfsFallbackGatewayUrl
    );
    return resp?.data;
  }

  if (isValidHttpUrl(uri)) {
    const resp = await fetchWithRetriesAndTimeout(uri, options);
    return resp?.data;
  }

  const inlineJsonBody = parseDataUri(uri);
  if (inlineJsonBody && inlineJsonBody.mime.startsWith("application/json")) {
    return JSON.parse(inlineJsonBody.body);
  }

  return;
};

exports.fetchMimeType = async (uri, timeout, defaultType) => {
  if (uri.startsWith("data:")) {
    const parsedUri = parseDataUri(uri);
    if (parsedUri) {
      return parsedUri.mime;
    }
    throw new Error("Cannot parse data uri");
  }
  // TODO(iain): Change include to endsWith
  if (uri.includes(".jpeg") || uri.includes(".jpg")) {
    return "image/jpeg";
  }
  if (uri.includes(".png")) {
    return "image/png";
  }
  try {
    const resp = await fetchWithRetriesAndTimeout(uri, {
      method: "HEAD",
      timeout,
    });

    return resp.headers["content-type"] || undefined;
  } catch (e) {
    console.warn(
      `Failed to fetch mimetype for uri: ${uri} because: ${
        e?.message || "Unknown Error occurred"
      }`
    );
    return defaultType;
  }
};

// TODO for if all else fails

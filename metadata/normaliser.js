const {
  MAKERSPLACE_TOKEN_ADDRESS,
  SUPERRARE_TOKEN_ADDRESS,
  ZORA_TOKEN_ADDRESS,
  HEAVEN_COMPUTER_TOKEN_ADDRESS,
  POTION_ART_TOKEN_ADDRESS,
  FOUNDATION_TOKEN_ADDRESS,
} = require("../constants/addresses");
const { isAddressMatch } = require("../utils/addresses");

exports.translateZoraMetadataSchema = async function (schema) {
  // TODO - this ia naive based on current usage
  if ("body" in schema) {
    return {
      origin: "catalog-20210202",
      version: "zora-20210604",
      name: schema.body.title,
      description: schema.body.notes || "",
      mimeType: schema.body.mimeType,
      image: !schema.body?.artwork?.isNft
        ? schema.body?.artwork?.info?.uri
        : undefined,
      external_url: "https://catalog.works",
      ...schema,
    };
  }

  return schema;
};

function normaliseAttributes(attributes) {
  if (Array.isArray(attributes)) {
    return attributes;
  }

  if (typeof attributes === "object") {
    return Object.keys(attributes).map((trait_type) => ({
      value: attributes[trait_type],
      trait_type,
    }));
  }

  return attributes;
}

exports.normaliseURIData = function (chainName, tokenAddress, data) {
  let normalisedData = data;

  if (isAddressMatch(chainName, tokenAddress, MAKERSPLACE_TOKEN_ADDRESS)) {
    const animationURI =
      normalisedData?.properties?.preview_media_file2 &&
      normalisedData?.properties?.preview_media_file2_type?.description ===
        "mp4"
        ? normalisedData?.properties?.preview_media_file2.description
        : undefined;

    if (animationURI) {
      normalisedData.animation_url = animationURI;
    }
  }

  // Fix for foundation: normalize content-type in animation for files ending in glb.
  if (isAddressMatch(chainName, tokenAddress, FOUNDATION_TOKEN_ADDRESS)) {
    normalisedData = {
      ...normalisedData,
      contentURLMimeType: normalisedData.animation_url?.endsWith("glb")
        ? "model/gltf-binary"
        : undefined,
    };
  }

  if (isAddressMatch(chainName, tokenAddress, ZORA_TOKEN_ADDRESS)) {
    normalisedData = translateZoraMetadataSchema(normalisedData);
  }

  if (isAddressMatch(chainName, tokenAddress, POTION_ART_TOKEN_ADDRESS)) {
    normalisedData = Object.entries(normalisedData.properties).reduce(
      (last, [key, value]) => {
        last[key] = value.description;
        return last;
      },
      {}
    );
    console.log(normalisedData);
  }

  if (isAddressMatch(chainName, tokenAddress, SUPERRARE_TOKEN_ADDRESS)) {
    normalisedData = {
      ...normalisedData,
      ...(normalisedData.media && {
        contentURL: normalisedData.media.uri,
        contentURLMimeType: normalisedData.media.mimeType,
      }),
    };
  }

  if (isAddressMatch(chainName, tokenAddress, HEAVEN_COMPUTER_TOKEN_ADDRESS)) {
    normalisedData = {
      ...normalisedData,
      ...(normalisedData.animation_url && {
        animation_url: normalisedData.image,
      }),
    };
  }

  // If properties exist on object, copy them over to attributes.
  // Properties match the 1155 standard for metadata properties.
  if (normalisedData.properties) {
    normalisedData = {
      ...normalisedData,
      attributes: normalisedData.properties,
    };
  }

  const attributes = normalisedData.attributes || normalisedData.traits;
  const image = normalisedData.image || normalisedData.image_url;
  return {
    ...normalisedData,
    ...(image && {
      image,
    }),
    ...(attributes && {
      attributes: normaliseAttributes(attributes),
    }),
  };
};

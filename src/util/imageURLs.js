export default async function imageURLs(item, context) {
  const { Media } = context.collections;
  const { productId, variantId } = item;
  if (!Media) return {};

  const media = await Media.find(
    {
      $or: [
        { "metadata.productId": productId },
        { "metadata.variantId": variantId },
      ],
      "metadata.workflow": { $nin: ["archived", "unpublished"] },
    },
    {
      sort: { "metadata.priority": 1, uploadedAt: 1 },
      limit: 1,
    }
  );

  if (!media || media.length === 0) return {};
  const primaryImage = media[0];

  if (!primaryImage) return {};

  return ensureAbsoluteUrls(
    {
      large: `${primaryImage.url({ store: "large" })}`,
      medium: `${primaryImage.url({ store: "medium" })}`,
      original: `${primaryImage.url({ store: "image" })}`,
      small: `${primaryImage.url({ store: "small" })}`,
      thumbnail: `${primaryImage.url({ store: "thumbnail" })}`,
    },
    context
  );
}

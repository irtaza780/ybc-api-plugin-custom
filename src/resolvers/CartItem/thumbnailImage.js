export default async function thumbnailImage(parent, _, context, info) {
  const { Catalog } = context.collections;
  const productId = parent.productId;
  const { product } = await Catalog.findOne({ "product._id": productId });

  return product?.primaryImage?.URLs?.thumbnail;
}

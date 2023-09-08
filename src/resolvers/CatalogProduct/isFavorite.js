export default async function isFavorite(parent, _, context, info) {
  console.log("parent in product is ", parent.productId);
  const { userId, collections, account, user } = context;

  console.log("context is ", context);

  const { FavoriteProducts } = collections;
  const productId = parent?.productId;
  if (await FavoriteProducts.findOne({ productId, userId })) {
    return true;
  } else return false;
}

export default async function markProductAsFavorite(context, productId) {
  const { userId, collections } = context;
  const { FavoriteProducts } = collections;

  const result = await FavoriteProducts.insertOne({
    userId,
    productId,
  });

  return result?.n > 0;
}

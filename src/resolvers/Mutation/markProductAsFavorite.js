export default async function markProductAsFavorite(
  _,
  { productId },
  context,
  info
) {
  if (!context.userId) return false;

  return await context.mutations.markProductAsFavorite(context, productId);
}

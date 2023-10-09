export default async function markProductAsFavorite(_, args, context, info) {
  if (!context.userId) return false;

  return await context.mutations.markProductAsFavorite(context, args);
}

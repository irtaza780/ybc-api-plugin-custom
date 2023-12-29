export default async function categories(parent, _, context, info) {
  const { ProductCategories } = context.collections;

  const categoriesIds = parent?.categories;
  const categories = await ProductCategories.find({
    _id: { $in: categoriesIds },
  }).toArray();

  return categories;
}

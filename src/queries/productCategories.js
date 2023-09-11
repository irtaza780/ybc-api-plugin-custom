export default async function productCategories(context) {
  const { collections } = context;
  const { ProductCategories } = collections;

  return ProductCategories.find();
}

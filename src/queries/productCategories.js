export default async function productCategories(context) {
  const { collections } = context;
  const { ProductCategories } = collections;

  console.log("inside product categories");

  return ProductCategories.find({});
}

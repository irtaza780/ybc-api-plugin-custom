import ReactionError from "@reactioncommerce/reaction-error";
export default async function addProductCategory(_, { input }, context, info) {
  const { userId, collections } = context;

  const { ProductCategories } = collections;

  if (!userId) throw new ReactionError("access-denied", "Access Denied");

  const { name, image } = input;
  const category = await ProductCategories.insertOne({ name, image });

  console.log("category", category);
}

export default async function createReview(_, { input }, context) {
  const createdReview = context.mutations.createReview(context, input);

  return createdReview;
}

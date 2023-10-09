export default async function createCustomOrder(_, { input }, context) {
  const createdOrder = context.mutations.createCustomOrder(context, input);

  return createdOrder;
}

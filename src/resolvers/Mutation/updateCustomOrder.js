export default async function updateCustomOrder(_, { input }, context) {
  return context.mutations.updateCustomOrder(context, input);
}

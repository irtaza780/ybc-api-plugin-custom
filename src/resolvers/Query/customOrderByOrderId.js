export default async function customOrderByOrderId(_, input, context, info) {
  return await context.queries.customOrderByOrderId(context, input);
}

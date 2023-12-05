export default async function userCustomOrderByOrderId(
  _,
  input,
  context,
  info
) {
  return await context.queries.userCustomOrderByOrderId(context, input);
}

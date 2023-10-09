export default async function createNotification(_, args, context, info) {
  await context.mutations.createNotification(context, args);
}

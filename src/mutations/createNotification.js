import Random from "@reactioncommerce/random";
import decodeOpaqueId from "@reactioncommerce/api-utils/decodeOpaqueId.js";
/**
 *
 * @method createNotification
 * @summary Get all of a Unit's Variants or only a Unit's top level Variants.
 * @param {Object} context - an object containing the per-request state
 * @param {String} unitOrVariantId - A Unit or top level Unit Variant ID.
 * @param {Boolean} topOnly - True to return only a units top level variants.
 * @param {Object} args - an object of all arguments that were sent by the client
 * @param {Boolean} args.shouldIncludeHidden - Include hidden units in results
 * @param {Boolean} args.shouldIncludeArchived - Include archived units in results
 * @returns {Promise<Object[]>} Array of Unit Variant objects.
 */
export default async function createNotification(context, args) {
  const { collections, pubSub } = context;
  const { Notifications } = collections;
  const { title, details, content, to, type, image, actionUrl } = args.input;

  console.log("args are ", args);
  console.log("decoded OPaque id is ", decodeOpaqueId(to));

  let decodedToId = to;

  const createdAt = new Date();

  let insertedNotification = {
    _id: Random.id(),
    title,
    details,
    content,
    readStatus: "unread",
    to: decodedToId,
    type,
    image,
    actionUrl,
    createdAt,
    updateAt: createdAt,
  };

  let NotificationsAdded = await Notifications.insertOne(insertedNotification);

  if (NotificationsAdded.insertedId) {
    let notificationResponse = await Notifications.findOne({
      _id: NotificationsAdded.insertedId,
    });
    pubSub.publish(`notifications-${to}`, {
      notifications: notificationResponse,
    });

    console.log("notification response is ", notificationResponse);

    return await notificationResponse;
  } else {
    throw new Error("Something went wrong");
  }
}

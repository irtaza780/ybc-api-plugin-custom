import decodeOpaqueId from "@reactioncommerce/api-utils/decodeOpaqueId.js";

const notifications = {
  subscribe: function subscribe(parent, args, context, info) {
    let { accountId } = args;
    let { pubSub } = context;
    let decodedId = decodeOpaqueId(accountId).id;

    return pubSub.asyncIterator(`notifications-${decodedId}`);
  },
};

export default notifications;

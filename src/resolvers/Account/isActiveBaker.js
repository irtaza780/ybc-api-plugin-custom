import { decodeAccountOpaqueId } from "../../xforms/id.js";

export default async function isActiveBaker(parent, _, context, info) {
  const { collections } = context;
  const { StripeSubscription } = collections;

  const userId = decodeAccountOpaqueId(parent._id);

  const subscription = await StripeSubscription.findOne({ userId });

  const paymentStatus = subscription?.paymentStatus;

  return paymentStatus ? paymentStatus : false;
}

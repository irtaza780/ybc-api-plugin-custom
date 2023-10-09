import _ from "lodash";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function customOrdersByShop(context) {
  const { userId, authToken } = context;
  const { collections } = context;

  const { Accounts, CustomOrders } = collections;

  if (!authToken || !userId)
    throw new ReactionError("access-denied", "Access Denied");

  const account = await Accounts.findOne({ _id: userId });

  const shopId = _.get(account, "adminUIShopIds.0");

  console.log("shopId is ", shopId);

  return CustomOrders.find({ shopId });
}

import _ from "lodash";
import ReactionError from "@reactioncommerce/reaction-error";
import checkMinMaxExists from "../util/checkMinMaxExists.js";

export default async function customOrdersByShop(context, input) {
  const { userId, authToken } = context;
  const { collections } = context;

  const { searchQuery, rangeFilter } = input;

  console.log("input is ", input);

  const { Accounts, CustomOrders } = collections;

  if (!authToken || !userId)
    throw new ReactionError("access-denied", "Access Denied");

  const account = await Accounts.findOne({ _id: userId });

  const shopId = _.get(account, "adminUIShopIds.0");

  let query = [];

  query.push({ shopId });

  if (rangeFilter) {
    if (checkMinMaxExists(rangeFilter, "startDate", "endDate")) {
      const startDate = rangeFilter.find(
        (item) => item.name === "startDate"
      ).value;
      const endDate = rangeFilter.find((item) => item.name === "endDate").value;

      console.log({ startDate, endDate });

      query.push({
        updatedAt: {
          $gte: startDate,
          $lte: endDate,
        },
      });
    }
  }

  if (searchQuery) {
    let fields = [
      {
        referenceId: {
          $regex: new RegExp(searchQuery, "i"),
        },
      },
      {
        itemName: {
          $regex: new RegExp(searchQuery, "i"),
        },
      },
      {
        email: {
          $regex: new RegExp(searchQuery, "i"),
        },
      },
      {
        phoneNumber: {
          $regex: new RegExp(searchQuery, "i"),
        },
      },
    ];

    query.push({ $or: fields });
  }
  console.log("query is", query);

  return CustomOrders.find({ $and: query });
}

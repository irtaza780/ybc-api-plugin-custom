import _ from "lodash";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function customOrdersByUser(context, input) {
  const { userId, authToken } = context;

  if (!authToken || !userId)
    throw new ReactionError("access-denied", "Access Denied");

  const { collections } = context;

  const { searchQuery, rangeFilter } = input;

  const { CustomOrders } = collections;

  let query = [];

  query.push({ orderBy: userId });

  if (rangeFilter) {
    if (checkMinMaxExists(rangeFilter, "startDate", "endDate")) {
      const startDate = rangeFilter.find(
        (item) => item.name === "startDate"
      ).value;
      const endDate = rangeFilter.find((item) => item.name === "endDate").value;

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
    ];

    query.push({ $or: fields });
  }

  return CustomOrders.find({ $and: query });
}

import Logger from "@reactioncommerce/logger";
import ReactionError from "@reactioncommerce/reaction-error";
import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";
import { decodeShopOpaqueId, decodeTagOpaqueId } from "../../xforms/id.js";
import xformCatalogBooleanFilters from "../../util/catalogBooleanFilters.js";

export default async function favoriteProducts(_, args, context, info) {
  const {
    tagIds: opaqueTagIds,
    booleanFilters,
    searchQuery,
    ...connectionArgs
  } = args;

  let shopIds = await context.collections.FavoriteProducts.find({
    userId: context.userId,
  }).toArray();

  console.log("shopIds1", shopIds);

  shopIds = shopIds.map((item) => {
    return item?.shopId;
  });

  console.log("shopIds2", shopIds);

  const tagIds = opaqueTagIds && opaqueTagIds.map(decodeTagOpaqueId);

  let catalogBooleanFilters = {};
  if (Array.isArray(booleanFilters) && booleanFilters.length) {
    catalogBooleanFilters = await xformCatalogBooleanFilters(
      context,
      booleanFilters
    );
  }

  if (connectionArgs.sortBy === "featured") {
    if (!tagIds || tagIds.length === 0) {
      throw new ReactionError(
        "not-found",
        "A tag ID is required for featured sort"
      );
    }
    if (tagIds.length > 1) {
      throw new ReactionError(
        "invalid-parameter",
        "Multiple tags cannot be sorted by featured. Only the first tag will be returned."
      );
    }
    const tagId = tagIds[0];
    return context.queries.catalogItemsAggregate(context, {
      catalogBooleanFilters,
      connectionArgs,
      searchQuery,
      shopIds,
      tagId,
    });
  }

  // minPrice is a sorting term that does not necessarily match the field path by which we truly want to sort.
  // We allow plugins to return the true field name, or fallback to the default pricing field.
  if (connectionArgs.sortBy === "minPrice") {
    let realSortByField;

    // Allow external pricing plugins to handle this if registered. We'll use the
    // first value returned that is a string.
    for (const func of context.getFunctionsOfType(
      "getMinPriceSortByFieldPath"
    )) {
      realSortByField = await func(context, { connectionArgs }); // eslint-disable-line no-await-in-loop
      if (typeof realSortByField === "string") break;
    }

    if (!realSortByField) {
      Logger.warn(
        "An attempt to sort catalog items by minPrice was rejected. " +
          "Verify that you have a pricing plugin installed and it registers a getMinPriceSortByFieldPath function."
      );
      throw new ReactionError(
        "invalid-parameter",
        "Sorting by minPrice is not supported"
      );
    }

    connectionArgs.sortBy = realSortByField;
  }

  console.log("queries list ", context.queries);

  const query = await context.queries.favoriteProducts(context, {
    catalogBooleanFilters,
    searchQuery,
    shopIds,
    tagIds,
  });

  return getPaginatedResponse(query, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info),
  });
}

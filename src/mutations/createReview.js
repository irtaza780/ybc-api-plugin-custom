import ReactionError from "@reactioncommerce/reaction-error";
import {
  decodeShopOpaqueId,
  decodeProductOpaqueId,
  encodeAccountOpaqueId,
  encodeShopOpaqueId,
  encodeProductOpaqueId,
} from "../xforms/id.js";
import SimpleSchema from "simpl-schema";
import customOrderNotification from "../util/customOrderNotification.js";
import Random from "@reactioncommerce/random";

const inputSchema = new SimpleSchema({
  shopId: String,
  productId: {
    type: String,
    optional: true,
  },
  reviewType: String,
  rating: Number,
  title: {
    type: String,
    optional: true,
  },
  description: {
    type: String,
    optional: true,
  },
});

export default async function createReview(context, input) {
  inputSchema.validate(input);

  const { userId, authToken, collections } = context;

  const { Reviews, Shops, Catalog } = collections;

  const { shopId, productId, reviewType, rating, title, description } = input;

  if (rating < 1 || rating > 5) {
    throw new ReactionError(
      "invalid-argument",
      "Rating value cannot be less than 1 or greater than 5 "
    );
  }

  const decodedShopId = decodeShopOpaqueId(shopId);
  // const decodedProductId = decodeProductOpaqueId(productId);

  const { product } = await Catalog.findOne({
    "product.slug": productId,
  });

  const decodedProductId = product._id

  const shop = await Shops.findOne({ _id: decodedShopId });
  if (!shop) throw new ReactionError("access-denied", "Invalid Shop");

  if (!userId || !authToken)
    throw new ReactionError("access-denied", "Access Denied");

  const createdAt = new Date();

  const review = {
    _id: Random.id(),
    shopId: decodedShopId,
    productId: decodedProductId,
    reviewType,
    reviewBy: context.userId,
    rating,
    isDeleted: false,
    title,
    description,
    helpfulCount: 0,
    description,
    createdAt,
    updatedAt: createdAt,
  };
  console.log("review obj is ", review)

  const createdReview = await Reviews.insertOne(review);

  // we will encode the account Id, product Id and shop Id when sending it as response to client
  review["reviewBy"] = encodeAccountOpaqueId(userId);
  review["shopId"] = encodeShopOpaqueId(decodedShopId);
  review["productId"] = encodeProductOpaqueId(decodedProductId);

  if (createdReview?.result?.n > 0) {
    return review;
  }
}

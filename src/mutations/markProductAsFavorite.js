import { decodeProductOpaqueId, decodeShopOpaqueId } from "../xforms/id.js";
import ReactionError from "@reactioncommerce/reaction-error";
import SimpleSchema from "simpl-schema";

const inputSchema = new SimpleSchema({
  productId: String,
  shopId: String,
});

export default async function markProductAsFavorite(context, input) {
  inputSchema.validate(input);

  const { shopId, productId } = input;

  const { userId, collections } = context;
  const { FavoriteProducts, Shops, Catalog } = collections;

  const decodedProductId = decodeProductOpaqueId(productId);
  const decodedShopId = decodeShopOpaqueId(shopId);

  const product = await Catalog.findOne({ "product._id": decodedProductId });
  const shop = await Shops.findOne({ _id: decodedShopId });

  if (!shop) throw new ReactionError("access-denied", "invalid shop");
  if (!product) throw new ReactionError("access-denied", "invalid product");

  const data = {
    userId,
    productId: decodedProductId,
    shopId: decodedShopId,
  };

  const deletedDocument = await FavoriteProducts.findOneAndDelete(data);

  if (deletedDocument.value) {
    return true;
  } else {
    const { result } = await FavoriteProducts.insertOne(data);

    return result?.n > 0;
  }
}

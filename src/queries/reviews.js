import _ from "lodash";
import { decodeProductOpaqueId, decodeShopOpaqueId } from "../xforms/id.js";

export default async function reviews(context, input) {
  const { collections } = context;
  const { Reviews, Catalog } = collections;
  const { productId, shopId } = input;

  const filter = {};

  if (shopId) {
    filter["shopId"] = decodeShopOpaqueId(shopId);
  }

  if (productId) {
    const { product } = await Catalog.findOne({ "product.slug": productId });
    if (product) {
      filter["productId"] = decodeProductOpaqueId(product._id);
    }
  }

  const reviews = Reviews.find(filter);

  console.log(await Reviews.find(filter).toArray());

  return reviews;
}

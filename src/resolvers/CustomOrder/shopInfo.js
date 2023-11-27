import { decodeShopOpaqueId } from "../../xforms/id.js";

export default async function shopInfo(parent, _, context, info) {
  const { Shops } = context.collections;

  const shopId = decodeShopOpaqueId(parent.shopId);
  return await Shops.findOne({ _id: shopId });
}

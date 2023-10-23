import { decodeShopOpaqueId } from "../../xforms/id.js";

export default async function taxRate(parent, _, context, info) {
  const { Taxes } = context.collections;

  console.log("parent in tax rate", parent);

  const shopId = decodeShopOpaqueId(parent._id);

  const { rate } = await Taxes.findOne({ shopId });
  return rate;
}

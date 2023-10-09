import { decodeAccountOpaqueId } from "../../xforms/id.js";

export default async function orderByInfo(parent, _, context, info) {
  const { Accounts } = context.collections;

  console.log("parent is ", parent);

  const userId = decodeAccountOpaqueId(parent.orderBy);
  return await Accounts.findOne({ _id: userId });
}

import { decodeAccountOpaqueId } from "../../xforms/id.js";

export default async function reviewByInfo(parent, _, context, info) {
  const { Accounts } = context.collections;

  console.log("review by info ", parent);

  const userId = decodeAccountOpaqueId(parent.reviewBy);
  return await Accounts.findOne({ _id: userId });
}

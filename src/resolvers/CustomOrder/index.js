import orderByInfo from "./orderByInfo.js";
import shopInfo from "./shopInfo.js";

import { encodeShopOpaqueId } from "../../xforms/id.js";

export default {
  orderByInfo,
  shopInfo,
  shopId: (node) => encodeShopOpaqueId(node.shopId),
};

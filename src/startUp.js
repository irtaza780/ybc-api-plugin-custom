import { productListingSchedule } from "./simpleSchemas.js";

function extendProductSchema(context) {
  context.simpleSchemas.Product.extend({
    productListingSchedule: {
      type: productListingSchedule,
      optional: true,
    },
    availableFulfillmentDates: {
      type: Array,
      optional: true,
    },
    "availableFulfillmentDates.$": {
      type: Date,
    },
  });
}

function schemaExtend(context) {
  extendProductSchema(context);
}

export { schemaExtend };

import { productListingSchedule, featuredShopImages } from "./simpleSchemas.js";

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

function extendCatalogProductVariantSchema(context) {
  context.simpleSchemas.CatalogProductVariant.extend({
    uploadedBy: {
      type: String,
      optional: true,
    },
    ancestorId: {
      type: String,
      optional: true,
    },
  });
}

function extendShopSchema(context) {
  context.simpleSchemas.Shop.extend({
    featuredShopImages: {
      type: Array,
      optional: true,
    },
    "featuredShopImages.$": {
      type: featuredShopImages,
    },
  });
}

function schemaExtend(context) {
  extendProductSchema(context);
  extendCatalogProductVariantSchema(context);
  extendShopSchema(context);
}

export { schemaExtend };

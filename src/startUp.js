import {
  productListingSchedule,
  featuredShopImages,
  productAttributes,
} from "./simpleSchemas.js";

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
      optional: true,
    },
    productAttributes: {
      type: Array,
      optional: true,
    },
    "productAttributes.$": {
      type: productAttributes,
    },
  });
}

function extendCatalogProductSchema(context) {
  context.simpleSchemas.CatalogProduct.extend({
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
    productAttributes: {
      type: Array,
      optional: true,
    },
    "productAttributes.$": {
      type: productAttributes,
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
  //shop
  extendShopSchema(context);
  //product
  extendProductSchema(context);
  //catalog
  extendCatalogProductSchema(context);
  //catalog variant
  extendCatalogProductVariantSchema(context);
}

export { schemaExtend };

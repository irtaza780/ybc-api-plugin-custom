export function myPublishProductToCatalog(catalogProduct, { product }) {
  //listing schedule for the product
  catalogProduct.productListingSchedule = product.productListingSchedule ?? {};

  // products available fulfillment dates
  catalogProduct.availableFulfillmentDates =
    product.availableFulfillmentDates ?? [];

  //product attributes based on which the new pricing is to be calculated
  catalogProduct.productAttributes = product.productAttributes ?? [];
}

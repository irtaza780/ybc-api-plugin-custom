import SimpleSchema from "simpl-schema";

export const productListingSchedule = new SimpleSchema({
  startDate: {
    type: Date,
    optional: true,
  },
  endDate: {
    type: Date,
    optional: true,
  },
});
const ImageSizes = new SimpleSchema({
  large: {
    type: String,
    label: "Large",
    optional: true,
  },
  medium: {
    type: String,
    label: "Medium",
    optional: true,
  },
  original: {
    type: String,
    label: "Original",
    optional: true,
  },
  small: {
    type: String,
    label: "Small",
    optional: true,
  },
  thumbnail: {
    type: String,
    label: "Thumbnail",
    optional: true,
  },
});

const options = new SimpleSchema({
  optionLabel: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});

export const productAttributes = new SimpleSchema({
  attribute: {
    type: String,
  },
  options: {
    type: Array,
  },
  "options.$": {
    type: options,
  },
});

export const featuredShopImages = new SimpleSchema({
  URLs: {
    type: ImageSizes,
  },
  priority: {
    type: Number,
  },
});

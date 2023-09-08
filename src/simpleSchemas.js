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



import _ from "lodash";
import ReactionError from "@reactioncommerce/reaction-error";
import formatDate from "./formatDate.js";

// for email
async function customOrderEmail(
  context,
  shopId,
  bakerEmail,
  bakerName,
  orderedByName,
  customOrdersLink,
  orderReference,
  itemName,
  quantity,
  dateOfPlacement,
  dateOfFulfillment
) {
  const templateName = "orders/custom";

  // here, the primary shop will be use each time to send the email to the baker
  const shop = await context.collections.Shops.findOne({ shopType: "primary" });
  if (!shop) throw new ReactionError("not-found", "Shop not found");

  const dataForEmail = {
    bakerName,
    orderedByName,
    customOrdersLink,
    orderReference,
    itemName,
    quantity,
    dateOfPlacement: formatDate(dateOfPlacement),
    dateOfFulfillment: formatDate(dateOfFulfillment),
  };

  return context.mutations.sendEmail(context, {
    data: dataForEmail,
    fromShop: shop,
    templateName,
    language: shop.language,
    to: "syedirtaza561@gmail.com",
  });
}

// for in-app notification

async function customOrderPush(context) {
  console.log("custom notification");
}

export default async function customOrderNotification(
  context,
  shopId,
  decodedShopId,
  orderReference,
  itemName,
  quantity,
  dateOfPlacement,
  fulfillmentDate
) {
  const { Accounts } = context.collections;

  //baker
  const bakerAccount = await Accounts.findOne({
    "adminUIShopIds.0": decodedShopId,
  });

  //user
  const userAccount = await Accounts.findOne({ _id: context.userId });

  const { firstName: bakerFirstName, lastName: bakerLastName } = _.pick(
    bakerAccount.profile,
    ["firstName", "lastName"]
  );

  const bakerEmail = _.get(bakerAccount, "emails.0.address");

  const { firstName: userFirstName, lastName: userLastName } = _.pick(
    userAccount.profile,
    ["firstName", "lastName"]
  );

  const bakerName = `${bakerFirstName} ${bakerLastName}`;
  const orderedByName = `${userFirstName} ${userLastName}`;

  const customOrdersLink = `${process.env.SHOP_ADMIN}/${shopId}`;

  await customOrderEmail(
    context,
    decodedShopId,
    bakerEmail,
    bakerName,
    orderedByName,
    customOrdersLink,
    orderReference,
    itemName,
    quantity,
    dateOfPlacement,
    fulfillmentDate
  );
}

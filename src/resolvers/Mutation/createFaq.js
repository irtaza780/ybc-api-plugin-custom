import Random from "@reactioncommerce/random";
import ReactionError from "@reactioncommerce/reaction-error";

export default async function createFaq(_, { input }, context, info) {
  try {
    const { authToken, userId, collections } = context;

    // if (!authToken || !userId)
    //   throw new ReactionError("access-denied", "Unauthorized");

    const { title, description } = input;
    const { Faq } = collections;
    const faqId = Random.id();

    await Faq.insertOne({
      _id: faqId,
      title,
      description,
    });

    return { _id: faqId, title, description };
  } catch (err) {
    return err;
  }
}

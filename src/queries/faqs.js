export default async function faqs(context) {
  const { collections } = context;
  const { Faq } = collections;

  console.log("Faq.find({});", Faq.find({}));

  return Faq.find({});
}

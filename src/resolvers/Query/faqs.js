import getPaginatedResponse from "@reactioncommerce/api-utils/graphql/getPaginatedResponse.js";
import wasFieldRequested from "@reactioncommerce/api-utils/graphql/wasFieldRequested.js";

export default async function faqs(_, args, context, info) {
  const { ...connectionArgs } = args;

  console.log("context.queries", context.queries);

  // const Faq = context.queries.faqs(context);

  console.log("context.queries", context.queries.faqs);

  const Faq = context.collections.Faq.find({});

  console.log("Faq in query is ", Faq);

  return getPaginatedResponse(Faq, connectionArgs, {
    includeHasNextPage: wasFieldRequested("pageInfo.hasNextPage", info),
    includeHasPreviousPage: wasFieldRequested("pageInfo.hasPreviousPage", info),
    includeTotalCount: wasFieldRequested("totalCount", info),
  });
}

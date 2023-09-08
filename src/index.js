import { createRequire } from "module";
import { schemaExtend } from "./startUp.js";
import schemas from "./schemas/index.js";
import resolvers from "./resolvers/index.js";
import mutations from "./mutations/index.js";

const require = createRequire(import.meta.url);
const pkg = require("../package.json");

/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {Object} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: pkg.label,
    name: pkg.name,
    version: pkg.version,
    functionsByType: {
      startup: [schemaExtend],
    },
    collections: {
      ProductCategories: {
        name: "ProductCategories",
      },
      FavoriteProducts: {
        name: "FavoriteProducts",
      },
    },
    graphQL: {
      resolvers,
      schemas,
    },
    mutations,
  });
}

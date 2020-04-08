/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
// exports.onCreateWebpackConfig = ({ stage, loaders, actions, getConfig }) => {
//   if (stage === 'build-html') {
//     actions.setWebpackConfig({
//       externals: getConfig().externals.concat(function(
//         context,
//         request,
//         callback
//       ) {
//         const regex = /^@?firebase(\/(.+))?/
//         // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
//         if (regex.test(request)) {
//           return callback(null, 'umd ' + request)
//         }
//         callback()
//       }),
//     })
//   }
// }
// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//   if (stage === 'build-html') {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /@firebase/,
//             use: loaders.null(),
//           },
//         ],
//       },
//     })
//   }
// }
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // Only update the `/app` page.
  if (page.path.match(/^\/app/)) {
    // page.matchPath is a special key that's used for matching pages
    // with corresponding routes only on the client.
    page.matchPath = '/app/*'
    // Update the page.
    createPage(page)
  }
}

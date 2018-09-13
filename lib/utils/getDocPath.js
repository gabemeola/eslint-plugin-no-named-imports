const pkg = require('../../package.json')

/**
* Generates the URL to documentation for the given rule name. It uses the
* package version to build the link to a tagged version of the
* documentation file.
*
* @param {string} ruleName - Name of the eslint rule
* @returns {string} URL to the documentation for the given rule
*/
function getDocsUrl(ruleName) {
  return `${pkg.repository}/blob/v${pkg.version}/docs/rules/${ruleName}.md`
}

module.exports = getDocsUrl;

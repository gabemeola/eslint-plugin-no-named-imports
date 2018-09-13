const getDocPath = require('../utils/getDocPath');


function create(context) {
  const [ { blacklist = [] } = {} ] = context.options;
  // TODO: Allow Regex
  const blacklistSet = new Set(blacklist);
  
  return {
    ImportDeclaration(node) {
      if (!node.source.value || !blacklistSet.has(node.source.value)) return;

      for (let im of node.specifiers) {
        const hasNamedImport = im.type === 'ImportSpecifier';
        
        if (hasNamedImport === true) {
          context.report(
            im,
            `Named import '${im.imported.name}' not allowed for commonjs module '${node.source.value}'`,
          );
        }
      }
    }
  };
};

module.exports = {
  meta: {
    docs: {
      description: 'Disallow named imports from blacklisted packages',
      url: getDocPath('named')
    },
    schema: [{
      additionalProperties: false,
      properties: {
        blacklist: {
          items: {
            type: 'string'
          },
          minItems: 1,
          type: 'array',
          uniqueItems: true
        },
      },
      type: 'object'
    }],
  },
  create: create,
};

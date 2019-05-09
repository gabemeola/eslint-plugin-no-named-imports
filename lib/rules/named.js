const getDocPath = require('../utils/getDocPath');
const getModuleName = require('../utils/getModuleName');
const createRequire = require('../utils/createRequire');

const moduleCache = new Map();

function create(context) {
  const [{ blacklist, whitelist } = {}] = context.options;
  if (blacklist) {
    blacklist.forEach((m) => {
      moduleCache.set(m, false)
    })
  }
  if (whitelist) {
    whitelist.forEach((m) => {
      moduleCache.set(m, true)
    })
  }
  const requireFromUser = createRequire(context.getFilename());

  
  return {
    ImportDeclaration(node) {
      const importPath = node.source.value;
      if (!importPath) return;
      const importedModule = getModuleName(importPath);

      let moduleIsEsm = true;

      if (moduleCache.has(importedModule) === false) {
        try {
          const pkg = requireFromUser(`${importedModule}/package.json`);
          moduleIsEsm = 'module' in pkg;
          moduleCache.set(importedModule, moduleIsEsm);
        } catch (err) {
          context.report(
            node,
            `Unable to resolve module '${importedModule}'`
          )
        }
      } else {
        moduleIsEsm = moduleCache.get(importedModule);
      }

      if (moduleIsEsm) return;

      for (let im of node.specifiers) {
        const hasNamedImport = im.type === 'ImportSpecifier';
        if (hasNamedImport === false) return;

        context.report(
          im,
          `Named import '${im.imported.name}' not allowed for commonjs module '${importedModule}'`,
        );
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
          minItems: 0,
          type: 'array',
          uniqueItems: true
        },
        whitelist: {
          items: {
            type: 'string'
          },
          minItems: 0,
          type: 'array',
          uniqueItems: true
        },
      },
      type: 'object'
    }],
  },
  create: create,
};

const blacklist = ['react']


function named(context) {
  return {
    ImportDeclaration(node) {
      if (node.source.value && blacklist.includes(node.source.value)) {
        for (let im of node.specifiers) {
          const hasNamedImport = im.type === 'ImportSpecifier';
          
          if (hasNamedImport === true) {
			      context.report(
            	im,
            	`Named import "${im.imported.name}" not allowed for commonjs module "${node.source.value}"`,
          	);
          }
        }
       
      }
    }
  };
};

module.exports = named;

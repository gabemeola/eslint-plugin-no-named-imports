const moduleImportFormat = /^((?:@[^/@]+\/)?[^/@]+)/

function getModuleName(importPath) {
  const match = moduleImportFormat.exec(importPath);

  if (match == null) return null;

  return match[1];
}

module.exports = getModuleName;

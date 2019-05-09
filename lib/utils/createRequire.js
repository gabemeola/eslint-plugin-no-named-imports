const { createRequire, createRequireFromPath } = require('module');


// Use createRequire if available in (running on Node v12)
// https://nodejs.org/api/modules.html#modules_module_createrequire_filename
//
// Else use createRequireFromPath (running Node v10-v11)
// It is deprecated as of Node v12
// https://nodejs.org/api/modules.html#modules_module_createrequirefrompath_filename
// 
// Otherwsise fallback to standard require and hope the user
// doesn't have some odd resolutions set up.
module.exports = createRequire || createRequireFromPath || (() => require);

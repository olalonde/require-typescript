// @see http://nodejs.org/api/all.html#all_require_extensions
var fs = require('fs')
  , exec = require('child_process').exec
  , crypto = require('crypto')
  , fs = require('fs')
  , execSync = require('execSync');

// typescript doesn't export any public interface, we need to spawn a
// process
// @todo: do I need to take care of caching or is this done at a higher level??
// @todo: cache compiled files and don't recompile them if source didn't
//        change (last modified date comparison)
require.extensions['.ts'] = function(module, filename) {
  var md5 = crypto.createHash('md5').update(filename).digest('base64');

  var out = '/tmp/require-typescript-' + md5;
  var cmd = __dirname + '/node_modules/.bin/tsc --out ' + out + ' ' + filename;
  execSync.stdout(cmd);
  var content = fs.readFileSync(out, 'utf8');
  execSync.stdout('rm ' + out);
  return module._compile(content, filename);
};

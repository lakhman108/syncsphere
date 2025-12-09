var fs = require('fs');
var path = '/Users/lakhman/Desktop/Final_year_project/syncsphere/node_modules/next/dist/server/lib/router-utils/setup-dev-bundler.js';
var content = fs.readFileSync(path, 'utf8');

var oldCode = `const appPath = _path.default.relative(dir, appPageFilePaths.get(p));`;
var newCode = `const appPath = appPageFilePaths.get(p) ? _path.default.relative(dir, appPageFilePaths.get(p)) : 'unknown';`;

if (content.includes(oldCode)) {
    content = content.replace(oldCode, newCode);
    console.log('Patched appPath');
} else {
    console.log('Could not find appPath code');
}

var oldCode2 = `const pagesPath = _path.default.relative(dir, pagesPageFilePaths.get(p));`;
var newCode2 = `const pagesPath = pagesPageFilePaths.get(p) ? _path.default.relative(dir, pagesPageFilePaths.get(p)) : 'unknown';`;

if (content.includes(oldCode2)) {
    content = content.replace(oldCode2, newCode2);
    console.log('Patched pagesPath');
} else {
    console.log('Could not find pagesPath code');
}

fs.writeFileSync(path, content);

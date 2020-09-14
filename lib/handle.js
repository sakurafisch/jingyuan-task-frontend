const fs = require('fs');
const path = require('path');

const packageFile = path.resolve(__dirname, '../prod-template/package.json');
const content = fs.readFileSync(packageFile, {
  encoding: 'utf8'
});
const contentObj = JSON.parse(content);

// 修改 package.json 文件
contentObj.name = '{{projectName}}';
delete contentObj.repository;
delete contentObj.author;
delete contentObj.bugs;
delete contentObj.homepage;
delete contentObj.scripts.push;

const newContent = JSON.stringify(contentObj, null, 2);
fs.writeFileSync(packageFile, newContent);

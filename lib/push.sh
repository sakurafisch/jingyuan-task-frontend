#!/usr/bin/env sh

# 后续的项目模板会迭代改进，为了便于修改测试后可以直接生成一份用于生产环境的模板文件，所以使用两个分支来区分
# origin/master 是平时开发测试的分支，origin/prod-template 是生产环境的模板文件
# 和 origin/master 的区别在于，origin/prod-template 删除了 node_modules 等文件，并且删除和修改了 package.json 中的一些字段
# 当开发并测试完成后，只需要 npm run push 就能将最新的模板文件应用于生产环境

var1=`date`

rm -rf ./prod-template
mkdir -p ./prod-template
mkdir -p ./prod-template/img
mkdir -p ./prod-template/src
mkdir -p ./prod-template/webpack
mkdir -p ./prod-template
cp -rf ./img/* ./prod-template/img
cp -rf ./src/* ./prod-template/src
cp -rf ./webpack/* ./prod-template/webpack
cp -rf ./.babelrc ./prod-template/
cp -rf ./.gitignore ./prod-template/
cp -rf ./.npmrc ./prod-template/
cp -rf ./images.d.ts ./prod-template/
cp -rf ./package.json ./prod-template/
cp -rf ./tsconfig.json ./prod-template/
cp -rf ./README.md ./prod-template/

node ./lib/handle.js

git branch -D prod-template
git checkout -b prod-template
git add prod-template/*
git commit -m "update templates on $var1"
git push origin prod-template:prod-template
git checkout master

rm -rf ./prod-template

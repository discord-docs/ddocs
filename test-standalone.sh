rm -rf ./standalone-test
mkdir ./standalone-test
cd ./standalone-test

cp ../next.config.js .
cp -r ../public .
cp ../package.json .

cp -rP ../.next/standalone/. ./
cp -rP ../.next/static/. ./.next/static/

node server.js
#!/usr/bin/env sh

npm install
npm run build
mkdir build
cp _redirects build/

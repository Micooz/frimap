#!/usr/bin/env bash

jsfiles=`ls public/js/ | grep ^[a-z]*.js$`

for js in $jsfiles; do
  name=`echo ${js} | cut -d "." -f1`
  uglifyjs public/js/${js} -c -m -o public/js/${name}.min.js --lint --comments
done


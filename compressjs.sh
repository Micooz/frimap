#!/usr/bin/env bash

jsfiles=`ls js/ | grep ^[a-z]*.js$`

for js in $jsfiles; do
  name=`echo ${js} | cut -d "." -f1`
  uglifyjs js/${js} -c -m -o js/${name}.min.js --lint --comments
done


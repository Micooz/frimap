#!/usr/bin/env bash

jsfolder=public/js/

babel ${jsfolder} --out-dir ${jsfolder} --extensions .jsx

jsfiles=`ls ${jsfolder} | grep ^[a-z]*.js$`

for js in $jsfiles; do
  name=`echo ${js} | cut -d "." -f1`
  uglifyjs ${jsfolder}${js} -c -m -o ${jsfolder}${name}.min.js --lint --comments 2> /dev/null
  echo "${jsfolder}${js} -> ${jsfolder}${name}.min.js"
done

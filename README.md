# BNFParser

Needed packages:
npm install -g nearley firebase-tools beefy watchify browserify  
(codemirror?)

npm install nearley-generator codemirror


To compile a new bnf.ne:
  nearleyc .\src\bnf.ne -o .\src\bnfgrammar.js

Run watchify:
watchify --debug .\src\main.js -o .\dist\bundle.js -v

Set up auto-reloading/localwebserver from dist dir:
beefy ..\src\main.js --live --index=./index.html


To deploy:
1. copy dist directory into firebase dir:
2. run:
    firebase deploy
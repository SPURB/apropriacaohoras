#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ] || [ "$TRAVIS_BRANCH" == "dev/app" ]; then
	cd app
	npm install
	npm run build:homolog
else
 echo 'this is not master branch or dev/app branch. Skipping app build test...'
fi
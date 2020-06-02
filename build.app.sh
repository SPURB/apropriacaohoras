#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ] || [ "$TRAVIS_BRANCH" == "dev/app" ]; then
	cd app
	npm run generate
else
 echo 'this is not master branch or dev/app branch. Skipping app build test...'
fi
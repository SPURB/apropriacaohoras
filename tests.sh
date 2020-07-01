#!/bin/bash
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
	cd app
	npm install
	npm run build:local
	npm run test:e2e:local
else
 echo 'this is not a pull request branch. Skipping app end-to-end tests...'
fi
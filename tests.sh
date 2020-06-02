#!/bin/bash
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  cd app
  npm install
  npm run build
  npm run start & wait-on http://localhost:3000
  npm run test
else
  echo 'this is not a pull request branch. Skipping app end-to-end tests...'
fi
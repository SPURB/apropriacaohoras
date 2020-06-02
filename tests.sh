#!/bin/bash
if [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
  cd app
  npm run build
  npm run test
else
  echo 'this is not a pull request branch. Skipping app end-to-end tests...'
fi
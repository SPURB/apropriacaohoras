#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ] || [ "$TRAVIS_BRANCH" == "dev/api" ]; then
	cd api
	git init
	git add .
	git commit -m "deploy"
	git remote add heroku git@heroku.com:apropriacaohoras.git
	# Turn off warnings about SSH keys:
	echo "Host heroku.com" >> ~/.ssh/config
	echo "   StrictHostKeyChecking no" >> ~/.ssh/config
	echo "   CheckHostIP no" >> ~/.ssh/config
	echo "   UserKnownHostsFile=/dev/null" >> ~/.ssh/config
	# Clear your current Heroku SSH keys:
	heroku keys:clear
	# Add a new SSH key to Heroku
	yes | heroku keys:add
	git push heroku master -f
	rm -fr .git
	echo "api deployed to heroku"
else
 echo 'this is not master branch or dev/api branch. Skipping api deploy...'
fi

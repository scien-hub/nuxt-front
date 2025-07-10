build:
	npm run build

format:
	npm run format

gitinit:
	rm -rf .git
	git init
	git add .
	git config user.name "Batchor"
	git config user.email "batchfy@gmail.com"
	git commit -m "Initial commit"
	git remote add github git@github.com:scien-hub/nuxt-front
	git remote add gitlab git@gitlab.com:scienhub/nuxt-front
	git push -u github main:main -f
	git push -u gitlab main:main -f

ncu:
	rm -rf node_modules package-lock.json
	npm i npm-check-updates -g
	npm run ncu -- -u
	npm i

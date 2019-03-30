install:
	npm install

start:
	npx babel src --out-dir dist
	
publish:
	npm publish

lint:
	npx eslint .

remote:
	git push origin master

install:
	npm install
	(cd .\node_modules\mongodb\ && npm i)

docker:
	docker compose up

test:
	npm run cypress
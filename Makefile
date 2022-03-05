install:
	npm install

docker:
	docker compose up

test:
	(cd cypress && npm run cypress)
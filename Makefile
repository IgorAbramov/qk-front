.PHONY: build build-prod start start-prod stop restart shell shell-front shell-db

DOCKER_COMPOSE=docker-compose
DOCKER_COMPOSE_RUN=$(DOCKER_COMPOSE) run --rm --no-deps
DOCKER_COMPOSE_RUN_WITH_DEPS=$(DOCKER_COMPOSE) run --rm
DOCKER_COMPOSE_DEV=$(DOCKER_COMPOSE) -f docker-compose.yml -f docker-compose.dev.yml
DOCKER_COMPOSE_PROD=$(DOCKER_COMPOSE) -f docker-compose.yml -f docker-compose.prod.yml

processing = qk_processing
db = qualkey_db
front = qk_front

build:
	$(DOCKER_COMPOSE_DEV) build

build-prod:
	$(DOCKER_COMPOSE_PROD) build

start:
	$(DOCKER_COMPOSE_DEV) up -d --force-recreate

start-prod:
	$(DOCKER_COMPOSE_PROD) up -d --force-recreate

stop:
	$(DOCKER_COMPOSE_DEV) down

stop-prod:
	$(DOCKER_COMPOSE_PROD) down

restart: stop start

shell:
	docker exec -it $(processing) sh

shell-front:
	docker exec -it $(front) sh

shell-db:
	docker exec -it $(db) bash

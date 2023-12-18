all:
	docker compose -f srcs/docker-compose.yml -p inception up --build -d --remove-orphans

clean:
	docker compose -f srcs/docker-compose.yml -p inception down

config:
	docker compose -f srcs/docker-compose.yml config

network:
	docker network inspect inception_inception
all:
	docker compose -f srcs/docker-compose.yml -p inception up --build -d --remove-orphans

clean:
	docker compose -f srcs/docker-compose.yml -p inception down

fclean:
	docker compose -f srcs/docker-compose.yml -p inception down -v

config:
	docker compose -f srcs/docker-compose.yml config

network:
	docker network inspect inception_inception

inspect:
	docker exec -it $(NAME) sh
# URL_shortnening_and_sharding

table_sql.sql which holds the table definition get executed when Dockerfile build version is used to spin the docker container for postgres instances

first build your Dockerfile
$ docker build -t urlshard .

spin up atleast 5 docker containers with postgres imaage we just built using our dockerfile

first instance/container :

$ docker run --name urlshard1 -p 5432:5432 -d urlshard

second instance/container :

$ docker run --name urlshard2 -p 5433:5432 -d urlshard
.
.
.
fifth instance/container :

$ docker run --name urlshard5 -p 5436:5432 -d urlshard

set up another docker container with pgadmin image and add your pg instance servers in pgadmin to visualize tables on each container/instance


## SSH to your mysql docker
```sh
docker ps # to find the docker id of mysql container
docker exec -it <docker_id> sh 
```

## login to mysql
```sh
mysql -u root -p
```

then enter your password

```sql
show databases; # list current databases
create database nicole_app;
GRANT ALL PRIVILEGES ON *.* TO 'nicole'@'localhost' IDENTIFIED BY 'password';
```
##  info server
```
db server: localhost
port:3306
username:root
password: pass
database:nicole_app
```


## run docker image
```
docker-compose up --build
```
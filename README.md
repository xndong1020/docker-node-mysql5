# TO start running project
```
docker-compose up --build
```

## if yu need to SSH to your mysql docker
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
create database xz;
```




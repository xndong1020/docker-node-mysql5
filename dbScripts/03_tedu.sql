#设置客户端连接服务器端编码
SET NAMES UTF8;
#丢弃数据库，如果存在
DROP DATABASE IF EXISTS tedu;
#创建数据库，设置存储的编码
CREATE DATABASE tedu CHARSET=UTF8;
#进入数据库
USE tedu;
#创建保存部门数据的表
CREATE TABLE dept(
  did SMALLINT PRIMARY KEY,
  dname VARCHAR(8),
  empCount SMALLINT
);
#插入数据
INSERT INTO dept VALUES
(30,'研发部',3),
(20,'运营部',2),
(10,'市场部',2);
#创建保存员工数据的表 
CREATE TABLE emp(
  eid INT PRIMARY KEY,
  ename VARCHAR(6),
  sex BOOL,
  birthday DATE,
  salary DECIMAL(8,2),  #999999.00
  deptId SMALLINT
);
#插入数据
INSERT INTO emp VALUES
(3,'小然',0,NULL,NULL,NULL);
INSERT INTO emp VALUES(2,'小华',1,'1980-3-2',210000,20);
INSERT INTO emp VALUES(1,'东东',1,'1983-5-2',220000,30);









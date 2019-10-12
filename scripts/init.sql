CREATE DATABASE [IF NOT EXISTS] nicole_app;
GRANT ALL PRIVILEGES ON *.* TO 'nicole'@'localhost' IDENTIFIED BY 'password';
use nicole_app;

CREATE TABLE test
(
id INTEGER AUTO_INCREMENT,
name TEXT,
PRIMARY KEY (id)
) COMMENT='this is my test table';
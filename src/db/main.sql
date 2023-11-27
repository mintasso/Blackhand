CREATE DATABASE db IF NOT EXISTS 

USE db

CREATE TABLE listed_users (user_id INT PRIMARY KEY, banning_tags JSON,
images JSON, reported_by_user INT, description_ TEXT );


CREATE TABLE reported_users (user_id BIGINT UNSIGNED PRIMARY KEY, reported_by_user INT, 
images JSON, description_ TEXT);

CREATE TABLE server_settings (server_id INT PRIMARY KEY, reported_by_user);

CREATE TABLE 


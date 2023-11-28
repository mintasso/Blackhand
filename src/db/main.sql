DROP DATABASE IF EXISTS db;

CREATE DATABASE IF NOT EXISTS db;

USE db;

CREATE TABLE listed_users (user_id BIGINT UNSIGNED, banning_tags INT UNSIGNED,
images JSON, reported_by_user BIGINT UNSIGNED, description_ TEXT, server_id_user_was_reported BIGINT UNSIGNED);


CREATE TABLE listed_users_tags (id INT UNSIGNED, tag SMALLINT UNSIGNED);


CREATE TABLE reported_users (user_id BIGINT UNSIGNED PRIMARY KEY, 
banning_tags INT UNSIGNED PRIMARY KEY, reported_by_user INT UNSIGNED, 
images JSON, description_ TEXT, server_id_user_was_reported BIGINT UNSIGNED);

CREATE TABLE reported_users_tags (FOREIGN KEY (id) REFERENCES reported_user(banning_tags) ON DELETE CASCADE, 
tag SMALLINT UNSIGNED);
CREATE TABLE reported_users_images (id INT UNSIGNED, image_ TEXT);

CREATE TABLE server_settings (server_id BIGINT UNSIGNED PRIMARY KEY, reported_by_user INT UNSIGNED, server_id_user_was_reported);

INSERT INTO listed_users (server_id_user_was_reported, user_id, banning_tags, images, reported_by_user, description_)
VALUES (771298227713998859, 864605650020597770, 1,
"{[eb91c396-8a4c-4df9-95a8-11576c323928]}", 1154857944744210484, "good boy");




INSERT INTO listed_users_tags (id, tag) VALUES (1, 2), (1, 3), (1, 4);


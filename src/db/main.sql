DROP DATABASE IF EXISTS db;

CREATE DATABASE IF NOT EXISTS db;

USE db;

CREATE TABLE listed_users (user_id BIGINT UNSIGNED, content_id INT UNSIGNED PRIMARY KEY, 
reported_by_user BIGINT UNSIGNED, description_ TEXT, 
server_id_user_was_reported BIGINT UNSIGNED);


CREATE TABLE listed_users_tags (FOREIGN KEY (id) REFERENCES listed_users(content_id) ON DELETE CASCADE, 
tag SMALLINT UNSIGNED);
CREATE TABLE listed_users_images (FOREIGN KEY (id) REFERENCES listed_users(content_id) ON DELETE CASCADE, 
image_ TEXT);


CREATE TABLE reported_users (user_id BIGINT UNSIGNED, reported_by_user INT UNSIGNED, 
content_id INT UNSIGNED, description_ TEXT, server_id_user_was_reported BIGINT UNSIGNED);

CREATE TABLE reported_users_tags (FOREIGN KEY (id) REFERENCES reported_user(content_id) ON DELETE CASCADE, 
tag SMALLINT UNSIGNED);

CREATE TABLE reported_users_images (
    FOREIGN KEY (id) REFERENCES reported_user(content_id) ON DELETE CASCADE, 
    image_ TEXT);



CREATE TABLE server_settings (server_id BIGINT UNSIGNED PRIMARY KEY, 
eported_by_user INT UNSIGNED, server_id_user_was_reported);

INSERT INTO listed_users (server_id_user_was_reported, user_id, content_id,
reported_by_user, description_)
VALUES (771298227713998859, 864605650020597770, 1, 1154857944744210484, "good boy");




INSERT INTO listed_users_tags (id, tag) VALUES (1, 2), (1, 3), (1, 4);
INSERT INTO listed_users_images (id, image_) VALUES (1, "sds"), (1, "png");

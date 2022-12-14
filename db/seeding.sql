DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS andi_contribution_log CASCADE;
DROP TABLE IF EXISTS clubs CASCADE;

CREATE TABLE IF NOT EXISTS clubs(
    club_id SERIAL PRIMARY KEY,
    club_name VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    and_title VARCHAR(100) NOT NULL,
    club_id INT REFERENCES clubs(club_id)
);

CREATE TABLE IF NOT EXISTS projects(
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    total_users BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS andi_contribution_log(
    log_id SERIAL PRIMARY KEY,
    project_id INT REFERENCES projects(project_id),
    user_id INT REFERENCES users(user_id)
);

INSERT INTO clubs (club_name) VALUES ('Babbage');
INSERT INTO clubs (club_name) VALUES ('Wangari');
INSERT INTO clubs (club_name) VALUES ('Jemison');

INSERT INTO users (first_name, last_name, and_title, club_id) VALUES ('Matthew', 'Gill', 'AND Aspiring Polymath', 1);
INSERT INTO users (first_name, last_name, and_title, club_id) VALUES ('Jack', 'McKelvey', 'AND Indie Rocker', 3);
INSERT INTO users (first_name, last_name, and_title, club_id) VALUES ('Will', 'Cowen', 'AND Marine Explorer', 2);
INSERT INTO users (first_name, last_name, and_title, club_id) VALUES ('Bradley', 'Gallagher', 'AND Space Orbiter', 1);
INSERT INTO users (first_name, last_name, and_title, club_id) VALUES ('Victoria', 'Igwemma', 'AND Knowledge Seeker', 3);

INSERT INTO projects (project_name, total_users) VALUES ('Very', 900000);
INSERT INTO projects (project_name, total_users) VALUES ('British Airways', 1900000);
INSERT INTO projects (project_name, total_users) VALUES ('Lloyds Bank', 1670000);
INSERT INTO projects (project_name, total_users) VALUES ('Vodafone', 32400000);
INSERT INTO projects (project_name, total_users) VALUES ('Costa Coffee', 1460000);

INSERT INTO andi_contribution_log (project_id, user_id) VALUES (1, 1);
INSERT INTO andi_contribution_log (project_id, user_id) VALUES (3, 1);
INSERT INTO andi_contribution_log (project_id, user_id) VALUES (5, 1);
INSERT INTO andi_contribution_log (project_id, user_id) VALUES (2, 2);
INSERT INTO andi_contribution_log (project_id, user_id) VALUES (4, 2);
INSERT INTO andi_contribution_log (project_id, user_id) VALUES (1, 3);
INSERT INTO andi_contribution_log (project_id, user_id) VALUES (4, 3);
INSERT INTO andi_contribution_log (project_id, user_id) VALUES (5, 3);
INSERT INTO andi_contribution_log (project_id, user_id) VALUES (1, 4);
INSERT INTO andi_contribution_log (project_id, user_id) VALUES (2, 4);
INSERT INTO andi_contribution_log (project_id, user_id) VALUES (3, 4);
INSERT INTO andi_contribution_log (project_id, user_id) VALUES (4, 4);
INSERT INTO andi_contribution_log (project_id, user_id) VALUES (5, 4);
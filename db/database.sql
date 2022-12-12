/*CREATE DATABASE AND_measure_database;

--\c into AND_measure_database;

CREATE TABLE andi_contribution_log(
    log_id SERIAL PRIMARY KEY,
    user_contribution BIGINT NOT NULL,
    project_id INT REFERENCES projects(project_id),
    user_id INT REFERENCES users(user_id)
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    and_title VARCHAR(100) NOT NULL,
    club VARCHAR(50) NOT NULL
)

CREATE TABLE projects(
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(255) NOT NULL,
    total_users BIGINT NOT NULL
);



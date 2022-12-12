const pool = require("../../db/db");

export const AddProject = async (req, res) => {
    try {
        let { project_name } = req.body;
        const newProject = await pool.query("INSERT INTO projects (project_name, total_users) VALUES ($1, 0) RETURNING *;", [project_name]);
        res.send(`Project ${project_name} created.`);
    } catch (error) {
        res.send(error);
    }
};

export const GetProjects = async (req, res) => {
    try {
        const allProjects = await pool.query("SELECT * FROM projects;")   
        res.json(allProjects.rows);   
    } catch (error) {
        res.send(error);   
    }
};
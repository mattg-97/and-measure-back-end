import { CreateNewProject, UpdateContributors } from '../../db/dataManager';

const pool = require('../../db/db');

export const AddProject = async (req, res) => {
  try {
    const { project_name: projectName, total_users: totalUsers, contributors } = req.body;
    await CreateNewProject(projectName, totalUsers);
    await UpdateContributors(projectName, contributors);
    res.send(`Project ${projectName} created.`);
  } catch (error) {
    res.send(error);
  }
};

export const GetProjects = async (req, res) => {
  try {
    const allProjects = await pool.query('SELECT * FROM projects;');
    console.log('All projects');
    res.json(allProjects.rows);
  } catch (error) {
    res.send(error);
  }
};

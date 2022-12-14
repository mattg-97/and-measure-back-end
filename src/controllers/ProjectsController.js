import { CreateNewProject, UpdateContributors } from '../../db/dataManager';

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

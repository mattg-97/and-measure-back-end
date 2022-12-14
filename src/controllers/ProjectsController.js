import { CreateNewProject, UpdateContributors } from '../../db/dataManager';

export const AddProject = async (req, res) => {
  try {
    const { project: projectName, livesBetter: totalUsers, users: contributors } = req.body;
    await CreateNewProject(projectName, totalUsers);
    await UpdateContributors(projectName, contributors);
    res.send(`Project ${projectName} created.`);
  } catch (error) {
    res.send(error);
  }
};

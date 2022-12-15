import { CreateNewProject, UpdateContributors } from '../../db/dataManager';

export const AddProject = async (req, res) => {
  try {
    const { projectName, livesBetter: totalUsers, users: contributors } = req.body;
    if (projectName === 'Error') {
      res.send('Error, project invalid');
    } else {
      await CreateNewProject(projectName, Number(totalUsers));
      await UpdateContributors(projectName, contributors);
      res.send(`Project ${projectName} created.`);
    }
  } catch (error) {
    res.send(error);
  }
};

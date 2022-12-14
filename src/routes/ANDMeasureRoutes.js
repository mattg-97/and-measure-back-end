import { GetANDContribution, GetClubContribution, GetGlobalProgress, GetIndividualContribution } from '../controllers/ContributionController';
import { AddProject } from '../controllers/ProjectsController';
import { AddUser, DeleteUser, GetAllUsers } from '../controllers/UsersController';

const routes = (app) => {
  app.route('/AddUser')
    .post(AddUser);

  app.route('/GetUsers')
    .get(GetAllUsers);

  app.route('/AddProject')
    .post(AddProject);

  app.route('/DeleteUser')
    .delete(DeleteUser);

  app.route('/GetGlobalProgress')
    .get(GetGlobalProgress);

  app.route('/GetIndividualContribution')
    .get(GetIndividualContribution);

  app.route('/GetANDContribution')
    .get(GetANDContribution);

  app.route('/GetClubContribution')
    .get(GetClubContribution);
};

export default routes;

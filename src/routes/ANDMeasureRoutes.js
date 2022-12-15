import { GetANDContribution, GetClubContribution, GetGlobalProgress, GetIndividualContribution } from '../controllers/ContributionController';
import { AddProject } from '../controllers/ProjectsController';
import { AddUser, DeleteUser, GetAllUsers, GetAllUsersForDropdown } from '../controllers/UsersController';

const routes = (app) => {
  app.route('/AddUser')
    .post(AddUser);

  app.route('/GetAllUsers')
    .get(GetAllUsers);

  app.route('/GetAllDropdownUsers')
    .get(GetAllUsersForDropdown);

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

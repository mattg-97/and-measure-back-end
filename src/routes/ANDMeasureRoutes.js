import { AddContribution } from "../controllers/LogController";
import { AddProject, GetProjects } from "../controllers/ProjectsController";
import { AddUser, DeleteUser, GetAllUsers } from "../controllers/UsersController";

const routes = (app) => {
    app.route("/AddUser")
    .post(AddUser);

    app.route("/GetUsers")
    .get(GetAllUsers);

    app.route("/AddProject")
    .post(AddProject);

    app.route("/GetProjects")
    .get(GetProjects);

    app.route("/DeleteUser")
    .delete(DeleteUser);

    app.route("/AddContribution")
    .post(AddContribution);
};

export default routes;
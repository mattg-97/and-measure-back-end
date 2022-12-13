import pool from './db';

export const CreateClubResponseObject = async (contributionObject) => {
  const clubName = contributionObject.rows[0].club_name;
  const clubId = Number(contributionObject.rows[0].club_id);
  const projectNames = [];
  const projectValues = [];
  for (const contribution of contributionObject.rows) {
    projectNames.push(contribution.project_name);
    projectValues.push(Number(contribution.total_users));
  }
  const responseObject = {
    club_name: clubName,
    club_id: clubId,
    dataSet: {
      labels: projectNames,
      values: projectValues
    }
  };
  return responseObject;
};

export const CreateIndiviudalResponseObject = async (contributionObject) => {
  const firstName = contributionObject.rows[0].first_name;
  const lastName = contributionObject.rows[0].last_name;
  const andTitle = contributionObject.rows[0].and_title;
  const projectNames = [];
  const projectValues = [];
  for (const contribution of contributionObject.rows) {
    projectNames.push(contribution.project_name);
    projectValues.push(Number(contribution.total_users));
  }
  const responseObject = {
    name: `${firstName} ${lastName}`,
    and_title: andTitle,
    dataSet: {
      labels: projectNames,
      values: projectValues
    }
  };
  return responseObject;
};

export const CreateNewProject = async (projectName, totalUsers) => {
  await pool.query('INSERT INTO projects (project_name, total_users) VALUES ($1, $2);', [projectName, totalUsers]);
};

export const GetProjectIDByName = async (projectName) => {
  const getProjectIDByName = await pool.query('select project_id from projects where project_name = $1;', [projectName]);
  return Number(getProjectIDByName.rows[0].project_id);
};

export const UpdateContributors = async (projectName, contributors) => {
  const projectId = await GetProjectIDByName(projectName);
  for (const contributor of contributors) {
    await pool.query('INSERT INTO andi_contribution_log (project_id, user_id) VALUES ($1, $2);', [projectId, contributor]);
  }
};

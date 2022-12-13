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

export const GetClubIDFromName = async (clubName) => {
  console.log(clubName);
  const clubId = await pool.query('SELECT club_id FROM clubs WHERE club_name = $1;', [clubName]);
  return Number(clubId.rows[0].club_id);
};

export const HandleClubContributionRequest = async (clubId) => {
  let clubContribution;
  if (typeof clubId === 'string') {
    const fetchedClubId = await GetClubIDFromName(clubId);
    clubContribution = await pool.query('Select DISTINCT project_name, total_users, club_name, club_id from projects p inner join(Select * from andi_contribution_log a inner join (Select c.club_id, club_name, user_id from clubs c inner join (Select * from users where club_id = $1) u on c.club_id = u.club_id) b on a.user_id = b.user_id) c on p.project_id = c.project_id;', [fetchedClubId]);
  } else {
    clubContribution = await pool.query('Select DISTINCT project_name, total_users, club_name, club_id from projects p inner join(Select * from andi_contribution_log a inner join (Select c.club_id, club_name, user_id from clubs c inner join (Select * from users where club_id = $1) u on c.club_id = u.club_id) b on a.user_id = b.user_id) c on p.project_id = c.project_id;', [clubId]);
  }
  return clubContribution;
};

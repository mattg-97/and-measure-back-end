import { CreateANDContributionObject, CreateClubResponseObject, CreateIndiviudalResponseObject, HandleClubContributionRequest } from '../../db/dataManager';

const pool = require('../../db/db');

export const GetANDContribution = async (req, res) => {
  try {
    const andContribution = await pool.query('Select club_name as clubName, sum(total_users) as totalUsers from (select * from projects p inner join(Select * from andi_contribution_log a inner join (Select c.club_id, club_name, user_id from clubs c inner join (Select * from users) u on c.club_id = u.club_id) b on a.user_id = b.user_id) c on p.project_id = c.project_id) as x GROUP BY club_name;');
    res.json(await CreateANDContributionObject(andContribution.rows));
  } catch (error) {
    res.send(error);
  }
};

export const GetClubContribution = async (req, res) => {
  try {
    const clubId = Number(req.query.clubId);
    const clubContribution = await HandleClubContributionRequest(clubId);
    res.json(await CreateClubResponseObject(clubContribution));
  } catch (error) {
    res.send(error);
  }
};

export const GetGlobalProgress = async (req, res) => {
  try {
    const globalContribution = await pool.query('SELECT SUM(total_users) FROM projects;');
    const responseObject = {
      goal: 200000000,
      current_contribution: Number(globalContribution.rows[0].sum)
    };
    res.json(responseObject);
  } catch (error) {
    res.send(error);
  }
};

export const GetIndividualContribution = async (req, res) => {
  try {
    const userId = Number(req.query.userId);
    const indiviudualContribution = await pool.query('select first_name, last_name, and_title, club_id, project_id, project_name, total_users from users inner join (select projects.project_id, project_name, total_users, user_id from projects inner join (select * from andi_contribution_log where user_id = $1) as contributions ON projects.project_id = contributions.project_id) as t1 on users.user_id = t1.user_id;', [userId]);
    res.json(await CreateIndiviudalResponseObject(indiviudualContribution));
  } catch (error) {
    res.send(error);
  }
};

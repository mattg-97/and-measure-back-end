import { CreateClubResponseObject, CreateIndiviudalResponseObject, HandleClubContributionRequest } from '../../db/dataManager';

const pool = require('../../db/db');

export const GetIndividualContribution = async (req, res) => {
  try {
    const userId = Number(req.query.user_id);
    const indiviudualContribution = await pool.query('select first_name, last_name, and_title, project_id, project_name, total_users from users inner join (select projects.project_id, project_name, total_users, user_id from projects inner join (select * from andi_contribution_log where user_id = $1) as contributions ON projects.project_id = contributions.project_id) as t1 on users.user_id = t1.user_id;', [userId]);
    res.json(await CreateIndiviudalResponseObject(indiviudualContribution));
  } catch (error) {
    res.send(error);
  }
};

export const GetClubContribution = async (req, res) => {
  try {
    const { club_id: clubId } = req.body;
    const clubContribution = await HandleClubContributionRequest(clubId);
    res.json(await CreateClubResponseObject(clubContribution));
  } catch (error) {
    res.send(error);
  }
};

export const GetANDContribution = async (req, res) => {
  try {
    const andContribution = await pool.query('Select DISTINCT project_name, total_users, club_name, club_id from (select * from projects p inner join(Select * from andi_contribution_log a inner join (Select c.club_id, club_name, user_id from clubs c inner join (Select * from users) u on c.club_id = u.club_id) b on a.user_id = b.user_id) c on p.project_id = c.project_id) as x ORDER BY club_name;');

    for (const contribution of andContribution.rows) {
      console.log(contribution);
    }

    res.json(andContribution.rows);
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

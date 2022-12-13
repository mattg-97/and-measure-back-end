import { CreateClubResponseObject, CreateIndiviudalResponseObject, HandleClubContributionRequest } from '../../db/dataManager';

const pool = require('../../db/db');

export const GetIndividualContribution = async (req, res) => {
  try {
    const { user_id: userId } = req.body;
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

const pool = require("../../db/db");

export const AddContribution = async (req, res) => {
    try {
        let { user_contribution, project_id, user_id } = req.body;
        const AddContribution = await pool.query("INSERT INTO andi_contribution_log (user_contribution, project_id, user_id) VALUES ($1, $2, $3) RETURNING *;", [user_contribution, project_id, user_id]);
        const totalContributionQuery = await pool.query("SELECT total_users FROM projects WHERE project_id = $1", [project_id]);
        const totalContribution = Number(totalContributionQuery.rows[0]['total_users']) + Number(user_contribution);
        const updateOverallContribution = await pool.query("UPDATE projects SET total_users = $1 WHERE project_id = $2", [totalContribution, project_id]);
        res.send("Work contribution successfully added.");
    } catch (error) {
        res.send(error);   
    }
};

export const GetTotalContributionsByUser = async (req, res) => {
    try {
        let { user_id } = req.body;
        const totalContributionsByUser = await pool.query("")
    } catch (error) {
        res.send(error);
    }
};

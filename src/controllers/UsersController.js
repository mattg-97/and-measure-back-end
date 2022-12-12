const pool = require("../../db/db");

export const AddUser = async (req, res) => {
    try {
        let { first_name, last_name, and_title, club } = req.body;
        const newUser = await pool.query(
            "INSERT INTO users (first_name, last_name, and_title, club) VALUES ($1, $2, $3, $4) RETURNING *;", [first_name, last_name, and_title, club]);
        res.json(`Successfully added user: ${first_name} ${last_name}`);
    } catch (error) {
        res.send(error);
    }
};

export const GetAllUsers = async (req, res) => {
    try {
        const newUser = await pool.query("select * from users;");
        res.json(newUser);
    } catch (error) {
        res.send(error);
    }
};

export const DeleteUser = async (req, res) => {
    try {
        const deleteUser = await pool.query("DELETE FROM users WHERE user_id = $1;", [req.user_id]);
        res.send("Successfully deleted user.");
    } catch (error) {
        res.send(error);      
    }
};
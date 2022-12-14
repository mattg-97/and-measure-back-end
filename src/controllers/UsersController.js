const pool = require('../../db/db');

export const AddUser = async (req, res) => {
  try {
    const { first_name: firstName, last_name: lastName, and_title: andTitle, club_id: clubId } = req.body;
    await pool.query(
      'INSERT INTO users (first_name, last_name, and_title, club_id) VALUES ($1, $2, $3, $4) RETURNING *;', [firstName, lastName, andTitle, clubId]);
    res.json(`Successfully added user: ${firstName} ${lastName}`);
  } catch (error) {
    res.send(error);
  }
};

export const GetAllUsers = async (req, res) => {
  try {
    const newUser = await pool.query('select first_name, last_name, user_id from users;');
    res.json(newUser);
  } catch (error) {
    res.send(error);
  }
};

export const DeleteUser = async (req, res) => {
  try {
    await pool.query('DELETE FROM users WHERE user_id = $1;', [req.user_id]);
    res.send('Successfully deleted user.');
  } catch (error) {
    res.send(error);
  }
};

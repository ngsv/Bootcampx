const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// Command-line arguments
const cmdArgs = process.argv.slice(2);
const cohortName = cmdArgs[0];
const limit = cmdArgs[1] || 5;
const values = [`%${cohortName}%`, limit];

pool.query(`
  SELECT id, name, cohort_id
  FROM students
  LIMIT 5;
`)
  .then(res => {
    console.log(res.rows);
  })
  .catch(err => console.error('query error', err.stack));


pool.query(`
  SELECT students.id AS student_id, students.name AS student_name, cohorts.name AS cohort
  FROM students
  JOIN cohorts ON cohort_id = cohorts.id
  WHERE cohorts.name LIKE $1
  LIMIT $2;
  `, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.student_name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  });

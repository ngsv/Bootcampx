const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

// Command-line arguments
const cmdArgs = process.argv.slice(2);

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
  WHERE cohorts.name LIKE '%${cmdArgs[0]}%'
  LIMIT ${cmdArgs[1] || 5};
  `)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.student_name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  });

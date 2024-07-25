import { exec } from 'child_process';

const tableName = process.argv[2];

if (!tableName) {
  console.error('Please provide a table name.');
  process.exit(1);
}

const command = `typeorm migration:create ./src/db/migrations/Create${tableName}Table`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }

  console.log(`Stdout: ${stdout}`);
});

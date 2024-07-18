const { v4: uuidv4 } = require('uuid');
const { execSync } = require('child_process');

const main = () => {
    const id = uuidv4();
    console.log(`SESSION_ID: ${id}`);
    execSync(`echo "ID=${id}" >> $GITHUB_ENV`);
}

main();
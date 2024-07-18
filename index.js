const { v4: uuidv4 } = require('uuid');
const { execSync } = require('child_process');
const core = require('@actions/core');

const main = () => {
    const id = uuidv4();
    console.log(`SESSION_ID: ${id}`);
    execSync(`echo "ID=${id}" >> $GITHUB_ENV`);
    core.setOutput('generated_id', id);
}

main();
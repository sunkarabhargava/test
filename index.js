const { v4: uuidv4 } = require('uuid');

const main = () => {
    const id = uuidv4();
    console.log(`SESSION_ID: ${id}`);
}

main();

const { v4: uuidv4 } = require('uuid');

const main = () => {
    const id = uuidv4();
    console.log(`Generated UUID: ${id}`);
}

main();
const generateId = () => {
    return Math.floor(Math.random() * 1000);
}

const main = () => {
    const id = generateId();
    console.log(`Generated ID: ${id}`);
}

main();
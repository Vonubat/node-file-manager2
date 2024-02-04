import { createInterface } from 'readline/promises';

import { getUsername } from '../utils/index.js';

function greeting(username) {
    console.log(`Welcome to the File Manager, ${username}!`);
}

function goodbye(username) {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
}

export function createDialog() {
    const username = getUsername();

    greeting(username);
    process.on('exit', () => goodbye(username));

    return createInterface({
        input: process.stdin,
        output: process.stdout,
    });
}

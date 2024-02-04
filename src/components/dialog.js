import { MSGS } from '../constants/index.js';
import { getUsername } from '../utils/index.js';

function greeting(username) {
    console.log(`${MSGS.WELCOME}, ${username}!`);
}

function goodbye(username) {
    console.log(`${MSGS.THANK_YOU}, ${username}, ${MSGS.GOODBYE}!`);
}

export function createDialog() {
    const username = getUsername();

    greeting(username);
    process.on('exit', () => goodbye(username));
}

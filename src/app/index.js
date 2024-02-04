import os from 'os';

import { createDialog } from '../components/index.js';
import { validateCmd, handleCmd } from '../commands/index.js';
import { parseInput } from '../utils/index.js';
import { MSGS } from '../constants/index.js';

export class FileManager {
    #currentPath;

    constructor(rootDir) {
        this.#currentPath = rootDir;
    }

    async #start() {
        const dialog = createDialog();

        while (true) {
            const input = await dialog.question(`You are currently in ${this.#currentPath}\n`);
            const [cmd, ...args] = parseInput(input);

            if (validateCmd(cmd, args)) {
                try {
                    const res = await handleCmd(cmd, this.#currentPath, args);

                    if (res) {
                        this.#currentPath = res;
                    }

                    console.log(MSGS.OPERATION_SUCCESSFUL);
                } catch (error) {
                    console.log(`\n\x1b[31m **${error}** \x1b[0m\n`);
                    console.log(MSGS.OPEARTION_FAILED);
                }
            } else {
                console.log(MSGS.INVALID_INPUT);
            }
        }
    }

    static run(rootDir = os.homedir()) {
        new FileManager(rootDir).#start();
    }
}

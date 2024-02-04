import fs from 'fs/promises';
import path from 'path';

import { ERROR_MSGS } from '../constants/index.js';

async function isExist(path) {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

export async function checkThatExist(path) {
    try {
        return await fs.stat(path);
    } catch {
        throw new Error(ERROR_MSGS.FILE_FOLDER_DOESNT_EXIST);
    }
}

export async function checkThatNotExist(path) {
    const isFileExist = await isExist(path);

    if (isFileExist) {
        throw new Error(ERROR_MSGS.FILE_EXISTS);
    }
}

export function isPathToFile(filename) {
    const dirMarkerRegExp = /\/|\\/g;
    return !dirMarkerRegExp.test(filename);
}

export async function checkIsNotFile(path) {
    const pathStat = await checkThatExist(path);
    const isFile = pathStat.isFile();

    if (isFile) {
        throw new Error(ERROR_MSGS.IS_FILE);
    }
}

export function getDirFromPath(filePath) {
    return path.dirname(filePath);
}

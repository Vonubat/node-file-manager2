import { createReadStream, createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';

import { checkThatExist, checkThatNotExist } from '../utils/index.js';

const ACTIONS = {
    compress: 'compress',
    decompress: 'decompress',
};

async function createBrotli(src, dest, action) {
    await checkThatExist(src);
    await checkThatNotExist(dest);

    const brotli = action === ACTIONS.decompress ? createBrotliDecompress() : createBrotliCompress();
    const srcStream = createReadStream(src);
    const destStream = createWriteStream(dest);

    await pipeline(srcStream, brotli, destStream);
}

export async function compress(...args) {
    await createBrotli(...args, ACTIONS.compress);
}

export const decompress = async (...args) => {
    await createBrotli(...args, ACTIONS.decompress);
};

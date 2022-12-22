#! /usr/bin/env node
import { dumpSyms } from "../src/dump-syms";
import path from 'path';
import fs from 'fs';

const allowedFileExtensions = [
    '',
    '.so'
];

const { argv } = process;
const inputFilePath = argv.at(-1)!;
const inputFileExtension = path.extname(inputFilePath);

if (!allowedFileExtensions.some(ext => inputFileExtension === ext)) {
    logErrorAndExit(`Unrecognized extension: ${inputFileExtension}`);
}

if (!fs.existsSync(inputFilePath)) {
    logErrorAndExit(`File doesn't exist at path: ${inputFilePath}`);
}

(async () => {
    const { stdout, stderr } = await dumpSyms(inputFilePath);
    
    console.log(inputFilePath);
    console.log(stdout);
    console.log(stderr);
})();

function logErrorAndExit(message: string) {
    console.error(message);
    process.exit(-1);
}
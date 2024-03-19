#! /usr/bin/env node
import { dumpSyms } from "../src/dump";
import { existsSync } from 'node:fs';

const { argv } = process;
const inputFilePath = argv.at(-2)!;
const outputFilePath = argv.at(-1)!;

if (!existsSync(inputFilePath)) {
    logErrorAndExit(`File doesn't exist at path ${inputFilePath}`);
}

if (!outputFilePath) {
    logErrorAndExit(`Please specify an output file path`);
}

dumpSyms(inputFilePath, outputFilePath);

function logErrorAndExit(message: string) {
    console.error(message);
    process.exit(-1);
}


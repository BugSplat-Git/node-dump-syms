#! /usr/bin/env node
import { Platform, dumpSyms } from "../src/dump-syms";
import fs from 'fs';

const { argv } = process;
const availablePlatforms = Object.keys(Platform).join(', ');
const inputFilePath = argv.at(-3)!;
const outputFilePath = argv.at(-2)!;
const platform = argv.at(-1)! as Platform;

if (!fs.existsSync(inputFilePath)) {
    logErrorAndExit(`File doesn't exist at path ${inputFilePath}`);
}

if (!outputFilePath) {
    logErrorAndExit(`Please specify an output file path`);
}

if (!validPlatform(platform)) {
    logErrorAndExit(`Please specify a platform, valid platforms: ${availablePlatforms}`);
}

(async () => {
    const { stdout, stderr } = await dumpSyms(inputFilePath, outputFilePath, platform);
    
    console.log(stdout);
    console.error(stderr);
    
    if (stderr) {
        process.exit(-1);
    }
})();

function logErrorAndExit(message: string) {
    console.error(message);
    process.exit(-1);
}

function validPlatform(platform: string): platform is Platform {
    return Boolean(platform && Object.keys(Platform).includes(platform as Platform));
}
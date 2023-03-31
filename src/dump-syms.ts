import { exec, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';
const execAsync = util.promisify(exec);

export enum Platform {
    darwin = 'darwin',
    amazonlinux = 'amazonlinux',
    bullseye = 'bullseye',
}

export async function dumpSyms(inputPath: string, outputPath: string, platform: Platform): Promise<{ stdout: string, stderr: string}> {
    return execAsync(createCommand(inputPath, outputPath, platform));
}

export function dumpSymsSync(filePath: string, outputPath: string, platform: Platform): Buffer {
    return execSync(createCommand(filePath, outputPath, platform));
}

function createCommand(inputPath: string, outputPath: string, platform: Platform): string {
    const dumpSymsPath = path.join(__dirname, `../bin/${platform}/dump_syms`);
    const supported = fs.existsSync(dumpSymsPath);
  
    if (!supported) {
        throw new Error(`Platform: ${platform} is not supported`);
    }
 
    return `${dumpSymsPath} ${inputPath} > ${outputPath}`;
}


import { exec, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';
const execAsync = util.promisify(exec);

export async function dumpSyms(filePath: string): Promise<{ stdout: string, stderr: string}> {
    return execAsync(createCommand(filePath));
}

export function dumpSymsSync(filePath: string): Buffer {
    return execSync(createCommand(filePath));
}

function createCommand(filePath: string): string {
    const { platform } = process;
    const dumpSymsPath = path.join(__dirname, `../bin/${platform}/dump_syms`);
    const supported = fs.existsSync(dumpSymsPath);
  
    if (!supported) {
        throw new Error(`Platform: ${platform} is not supported`);
    }
 
    return `${dumpSymsPath} ${filePath}`;
}


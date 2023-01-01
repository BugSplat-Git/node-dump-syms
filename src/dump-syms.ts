import util from 'util';
import path from 'path';
import fs from 'fs';
import * as child_process from 'child_process';
const exec = util.promisify(child_process.exec);

export async function dumpSyms(filePath: string): Promise<{ stdout: string, stderr: string}> {
    const { platform } = process;
    const dumpSymsPath = path.join(__dirname, `../bin/${platform}/dump_syms`);
    const supported = fs.existsSync(dumpSymsPath);
  
    if (!supported) {
        throw new Error(`Platform: ${platform} is not supported`);
    }
 
    const command = `${dumpSymsPath} ${filePath}`;

    return exec(command);
}


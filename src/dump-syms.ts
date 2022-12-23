import util from 'util';
import path from 'path';
import * as child_process from 'child_process';
const exec = util.promisify(child_process.exec);

export async function dumpSyms(filePath: string): Promise<{ stdout: string, stderr: string}> {
    const { platform } = process;
    const isLinux = platform === 'linux';
    
    if (!isLinux) {
        throw new Error(`Platform: ${platform} is not supported`);
    }

    const dumpSymsPath = path.join(__dirname, `../bin/${platform}/dump_syms`);
    const command = `${dumpSymsPath} ${filePath}`;

    return exec(command);
}
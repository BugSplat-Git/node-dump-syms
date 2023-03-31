import * as child_process from 'child_process';
import path from 'path';
import util from 'util';
import { platformSpec } from "./support/platform-spec";
import { readFile } from 'fs/promises';
const exec = util.promisify(child_process.exec);
const testScript = path.join(__dirname, '..', 'bin', 'index.ts');

describe('command line', () => {
    platformSpec('darwin', 'should dump symbols for macos', async () => {
        const fileName = 'addon.node';
        const binary = path.join(__dirname, 'support', 'darwin', fileName);
        const output = path.join(__dirname, '..', 'out', `${fileName}.sym`);
        const { stdout, stderr } = await exec(`ts-node ${testScript} ${binary} ${output} darwin`);
        const result = await readFile(output);

        expect(stderr?.trim()).toBeFalsy();
        expect(stdout?.trim()).toBeFalsy();
        expect(result.toString()).toContain('MODULE mac arm64 B7EBC13028993DE9A52CCAC5C2BB11120 addon.node');
    });

    platformSpec('linux', 'should dump symbols for linux', async () => {
        const fileName = 'my-ubuntu-crasher';
        const binary = path.join(__dirname, 'support', 'linux', fileName);
        const output = path.join(__dirname, '..', 'out', `${fileName}.sym`);
        const { stdout, stderr } = await exec(`ts-node ${testScript} ${binary} ${output} bullseye`);
        const result = await readFile(output);

        expect(stderr?.trim()).toBeFalsy();
        expect(stdout?.trim()).toBeFalsy();
        expect(result.toString()).toContain('MODULE Linux x86_64 C02619C863B6901D53DDD444CED8D6090 802c7064eb1eb5e6b839d554c4626ab3');
    });
});
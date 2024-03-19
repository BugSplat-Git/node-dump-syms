import * as child_process from 'child_process';
import { readFile } from 'fs/promises';
import path from 'path';
import util from 'util';
const exec = util.promisify(child_process.exec);
const testScript = path.join(__dirname, '..', 'bin', 'index.ts');

describe('command line', () => {
    it('should dump symbols for macos', async () => {
        const fileName = 'addon.node';
        const binary = path.join(__dirname, 'test_data', 'macOS', fileName);
        const output = path.join(__dirname, '..', 'out', `${fileName}.sym`);
        const { stdout, stderr } = await exec(`ts-node ${testScript} ${binary} ${output}`);
        const result = await readFile(output);

        expect(stderr?.trim()).toBeFalsy();
        expect(stdout?.trim()).toBeFalsy();
        expect(result.toString()).toContain('MODULE Mac arm64 B7EBC13028993DE9A52CCAC5C2BB11120 addon.node');
    });

    it('should dump symbols for linux', async () => {
        const fileName = 'my-ubuntu-crasher';
        const binary = path.join(__dirname, 'test_data', 'linux', fileName);
        const output = path.join(__dirname, '..', 'out', `${fileName}.sym`);
        const { stdout, stderr } = await exec(`ts-node ${testScript} ${binary} ${output}`);
        const result = await readFile(output);

        expect(stderr?.trim()).toBeFalsy();
        expect(stdout?.trim()).toBeFalsy();
        expect(result.toString()).toContain('MODULE Linux x86_64 C02619C863B6901D53DDD444CED8D6090 my-ubuntu-crasher');
    });
});
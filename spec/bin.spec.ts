import * as child_process from 'child_process';
import path from 'path';
import util from 'util';
import { platformSpec } from "./support/platform-spec";
const exec = util.promisify(child_process.exec);
const testScript = path.join(__dirname, '..', 'bin', 'index.ts');

describe('command line', () => {
    platformSpec('darwin', 'should dump symbols for macos', async () => {
        const binary = path.join(__dirname, 'support', 'darwin', 'addon.node');
        const { stdout, stderr } = await exec(`ts-node ${testScript} ${binary}`);

        expect(stderr?.trim()).toBeFalsy();
        expect(stdout).toContain('MODULE mac arm64 B7EBC13028993DE9A52CCAC5C2BB11120 addon.node');
    });

    platformSpec('linux', 'should dump symbols for linux', async () => {
        const binary = path.join(__dirname, 'support', 'linux', 'my-ubuntu-crasher');
        const { stdout, stderr } = await exec(`ts-node ${testScript} ${binary}`);

        expect(stderr?.trim()).toBeFalsy();
        expect(stdout).toContain('MODULE Linux x86_64 C02619C863B6901D53DDD444CED8D6090 802c7064eb1eb5e6b839d554c4626ab3');
    });
});
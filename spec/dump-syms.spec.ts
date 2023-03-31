import path from "path";
import { Platform, dumpSyms, dumpSymsSync } from "../src/dump-syms";
import { platformSpec } from "./support/platform-spec";
import { readFile } from "fs/promises";

describe('lib', () => {
    describe('dumpSyms', () => {
        platformSpec('darwin', 'should dump symbols for macos', async () => {
            const fileName = 'addon.node';
            const binary = path.join(__dirname, 'support', 'darwin', fileName);
            const output = path.join(__dirname, '..', 'out', `${fileName}.sym`);
            const { stdout, stderr } = await dumpSyms(binary, output, Platform.darwin);
            const result = await readFile(output);
    
            expect(stderr).toBeFalsy();
            expect(stdout).toBeFalsy();
            expect(result.toString()).toContain('MODULE mac arm64 B7EBC13028993DE9A52CCAC5C2BB11120 addon.node');
        });

        platformSpec('linux', 'should dump symbols for linux', async () => {
            const fileName = 'my-ubuntu-crasher';
            const binary = path.join(__dirname, 'support', 'linux', fileName);
            const output = path.join(__dirname, '..', 'out', `${fileName}.sym`);
            const { stdout, stderr } = await dumpSyms(binary, output, Platform.bullseye);
            const result = await readFile(output);
    
            expect(stderr).toBeFalsy();
            expect(stdout).toBeFalsy();
            expect(result.toString()).toContain('MODULE Linux x86_64 C02619C863B6901D53DDD444CED8D6090 802c7064eb1eb5e6b839d554c4626ab3');
        });
    });

    describe('dumpSymsSync', () => {
        platformSpec('darwin', 'should dump symbols for macos', async () => {
            const fileName = 'addon.node';
            const binary = path.join(__dirname, 'support', 'darwin', fileName);
            const output = path.join(__dirname, '..', 'out', `${fileName}.sym`);
            const stdout = dumpSymsSync(binary, output, Platform.darwin);
            const result = await readFile(output);
    
            expect(stdout.toString()).toBeFalsy();
            expect(result.toString()).toContain('MODULE mac arm64 B7EBC13028993DE9A52CCAC5C2BB11120 addon.node');
        });

        platformSpec('linux', 'should dump symbols for linux', async () => {
            const fileName = 'my-ubuntu-crasher';
            const binary = path.join(__dirname, 'support', 'linux', fileName);
            const output = path.join(__dirname, '..', 'out', `${fileName}.sym`);
            const stdout = dumpSymsSync(binary, output, Platform.bullseye);
            const result = await readFile(output);
    
            expect(stdout.toString()).toBeFalsy();
            expect(result.toString()).toContain('MODULE Linux x86_64 C02619C863B6901D53DDD444CED8D6090 802c7064eb1eb5e6b839d554c4626ab3');
        });
    });
});
import path from "path";
import { dumpSyms, dumpSymsSync } from "../src/dump-syms";
import { platformSpec } from "./support/platform-spec";

describe('lib', () => {
    describe('dumpSyms', () => {
        platformSpec('darwin', 'should dump symbols for macos', async () => {
            const binary = path.join(__dirname, 'support', 'darwin', 'addon.node');
            const { stdout, stderr } = await dumpSyms(binary);
    
            expect(stderr).toBeFalsy();
            expect(stdout).toContain('MODULE mac arm64 B7EBC13028993DE9A52CCAC5C2BB11120 addon.node');
        });

        platformSpec('linux', 'should dump symbols for linux', async () => {
            const binary = path.join(__dirname, 'support', 'linux', 'my-ubuntu-crasher');
            const { stdout, stderr } = await dumpSyms(binary);
    
            expect(stderr).toBeFalsy();
            expect(stdout).toContain('MODULE Linux x86_64 C02619C863B6901D53DDD444CED8D6090 802c7064eb1eb5e6b839d554c4626ab3');
        });
    });

    describe('dumpSymsSync', () => {
        platformSpec('darwin', 'should dump symbols for macos', () => {
            const binary = path.join(__dirname, 'support', 'darwin', 'addon.node');
            const stdout = dumpSymsSync(binary);
    
            expect(stdout.toString()).toContain('MODULE mac arm64 B7EBC13028993DE9A52CCAC5C2BB11120 addon.node');
        });

        platformSpec('linux', 'should dump symbols for linux', () => {
            const binary = path.join(__dirname, 'support', 'linux', 'my-ubuntu-crasher');
            const stdout = dumpSymsSync(binary);
    
            expect(stdout.toString()).toContain('MODULE Linux x86_64 C02619C863B6901D53DDD444CED8D6090 802c7064eb1eb5e6b839d554c4626ab3');
        });
    });
});
import { readFile } from "fs/promises";
import path from "path";
import { dumpSyms } from "../src/dump";

describe('dumpSyms', () => {
    it('should dump symbols for node addon', async () => {
        const fileName = 'addon.node';
        const binary = path.join(__dirname, 'test_data', 'macOS', fileName);
        const output = path.join(__dirname, '..', 'out', `${fileName}.sym`);
        dumpSyms(binary, output);
        const result = await readFile(output);

        const resultStrng = result.toString();
        expect(resultStrng).toContain('MODULE Mac arm64 B7EBC13028993DE9A52CCAC5C2BB11120 addon.node');
    });

    it('should dump symbols for linux binary', async () => {
        const fileName = 'my-ubuntu-crasher';
        const binary = path.join(__dirname, 'test_data', 'linux', fileName);
        const output = path.join(__dirname, '..', 'out', `${fileName}.sym`);
        dumpSyms(binary, output);
        const result = await readFile(output);

        expect(result.toString()).toContain('MODULE Linux x86_64 C02619C863B6901D53DDD444CED8D6090 my-ubuntu-crasher');
    });
});
const nodeDumpSyms = require('../index.node');

export function dumpSyms(inputPath: string, outputPath: string): void {
    // TODO BG support other options here
    return nodeDumpSyms.dumpSymbols([inputPath], outputPath);
}

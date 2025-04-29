const nodeDumpSyms = require('../native/index.node');

export function dumpSyms(inputPath: string, outputPath: string): void {
    // TODO BG support other options here
    if (!inputPath) {
        throw new Error('inputPath is required');
    }

    if (!outputPath) {
        throw new Error('outputPath is required');
    }

    return nodeDumpSyms.dumpSymbols([inputPath], outputPath);
}

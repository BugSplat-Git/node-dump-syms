const { platform } = process;

export function platformSpec(nodePlatform: string, description: string, test: () => Promise<void> | void) {
    if (platform == nodePlatform) {
        it(description, test);
    }
}
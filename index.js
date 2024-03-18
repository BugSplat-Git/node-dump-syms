const myNeonModule = require('./index.node'); // Adjust the path as necessary

try {
    myNeonModule.dumpSymbols(['./spec/my-ubuntu-crasher'], 'out.sym');
    console.log('Symbols dumped successfully');
} catch (error) {
    console.error('Failed to dump symbols:', error);
}

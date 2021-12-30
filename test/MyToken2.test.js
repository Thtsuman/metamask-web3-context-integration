const { assert } = require('chai')

const MyToken2 = artifacts.require('./MyToken2')

// check for chai
require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('MyToken2', (accounts) => {
    let contract;

    before(async () => {
        contract = await MyToken2.deployed();
    })

    // testing container 
    describe('deployment', async () => {

        it('deploys successfully', async () => {
            const address = contract.address;

            assert.notEqual(address, '', "address is empty");
            assert.notEqual(address, null, "address is null");
            assert.notEqual(address, undefined, "address is undefined");
            assert.notEqual(address, 0x0, "address is 0x0 address");
        })

        it('Check name and symbol of the contract', async () => {
            const name = await contract.name();
            assert.equal(name, 'MyToken2', "name is not equal");

            const symbol = await contract.symbol();
            assert.equal(symbol, 'MTN2', "symbol is not equal");
        })

    })
})
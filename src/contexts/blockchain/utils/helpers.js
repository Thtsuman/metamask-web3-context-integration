import blockchainConstant from './constant.blockchain'

/*
    get chain data can take both hex or networkId
    and will return chain object
*/
export const getNetworkData = (input) => {
    const selectedNetwork = blockchainConstant.networks.find(network => {
        return network.networkId === input || network.hex === input 
    })

    if(selectedNetwork) {
        return selectedNetwork
    } else return { input, network: 'custom' };
}

export default getNetworkData


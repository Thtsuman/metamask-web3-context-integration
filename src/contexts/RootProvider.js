import React from 'react'
import { MetaMaskProvider } from './blockchain/metaMaskContext'
import { Web3Provider } from './blockchain/web3Context'

const RootProvider = ({ children }) => {
    return (
        <>
            <MetaMaskProvider>
                <Web3Provider>
                    {children}
                </Web3Provider>
            </MetaMaskProvider>
        </>
    )
}

export default RootProvider
